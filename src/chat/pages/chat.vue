<script>
import axios from 'axios';
import { watch } from 'vue';
import {PatientService} from "../services/patient.service.js";
import {PatientAssembler} from "../../patient-management/services/patient.assembler.js";

const httpInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default {
  props: {
    patientId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      selectedPatientId: null,
      patientName: '',
      patients: [],
      messages: [],
      newMessage: '',
      menuOpen: null,
      doctorId: 1, //ID del doctor activo
      patientsService: new PatientService()
    };
  },
  watch: {
    '$route.params.patientId': {
      immediate: true,
      async handler(newId) {
        this.selectedPatientId = newId;
        if (newId) {
          await this.fetchMessages();
        } else {
          await this.fetchPatients();
        }
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeMenuOutside);
  },
  mounted() {
    document.addEventListener('click', this.closeMenuOutside);
  },
  methods: {
    async fetchPatients(doctorId) {
      this.patientsService.getAllPatientsByDoctorId(this.doctorId)
        .then((response) => {
          console.log(response);
          this.patients = PatientAssembler.toEntitiesFromResponse(response);
        });
    },

    async fetchMessages() {
      try {
        console.log("📡 Solicitando mensajes para paciente:", this.selectedPatientId);
        const res = await httpInstance.get(`/chat/messages/${this.selectedPatientId}`);
        console.log("✅ Mensajes recibidos:", res.data);

        this.messages = res.data.map(msg => ({
          ...msg,
          from: typeof msg.from === 'object'
              ? msg.from
              : { role: msg.fromRole || msg.from, userId: msg.fromUserId || null }
        }));

        const patientRes = await this.patientsService.getPatientById(this.selectedPatientId);

        this.patientName = patientRes.data.name;

      } catch (error) {
        console.error('Error al obtener mensajes o paciente:', error);
        console.error('Detalles del error:', error?.response?.data || error.message);
      }
    },



    async sendMessage() {
      if (!this.newMessage.trim()) return;

      const message = {
        from: {
          userId: 1, // o el ID real
          role: 'doctor'
        },
        text: this.newMessage,
        timestamp: Date.now()
        // patientId ya no va en el body
      };

      try {
        await httpInstance.post('/chat/messages', {
          fromUserId: message.from.userId,
          fromRole: message.from.role,
          text: message.text,
          timestamp: message.timestamp,
          patientId: parseInt(this.selectedPatientId)
        });
        this.newMessage = '';
        await this.fetchMessages();
      } catch (error) {
        console.error('Error al enviar el mensaje al backend:', error);
      }
    },
    toggleMenu(id) {
      this.menuOpen = this.menuOpen === id ? null : id;
    },
    async deleteMessage(id) {
      try {
        await httpInstance.delete(`/messages/${id}`);
        this.messages = this.messages.filter(msg => msg.id !== id);
        this.menuOpen = null;
      } catch (error) {
        console.error('Error eliminando mensaje:', error);
      }
    },
    closeMenuOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.menuOpen = null;
      }
    },
    goBack() {
      this.$router.push('/patient-management/patients');
    },
    selectPatient(id) {
      this.$router.push(`/chat/${id}`);
    }
  }
};
</script>

<template>
  <div class="chat-container">
    <div class="chat-header">
      <button @click="goBack" class="back-button">⬅ Volver</button>
      <span v-if="selectedPatientId">Paciente: {{ patientName }}</span>
      <span v-else>Selecciona un paciente para iniciar chat</span>
    </div>

    <!-- Lista de pacientes -->
    <div v-if="!selectedPatientId" class="patient-list">
      <ul>
        <li v-for="p in patients" :key="p.id" class="patient-item">
          {{ p.name }}
          <button @click="selectPatient(p.id)">Enviar mensaje</button>
        </li>
      </ul>
    </div>

    <!-- Mensajes -->
    <div v-else class="chat-body">
      <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['chat-message', msg.from?.role === 'doctor' ? 'doctor' : 'patient']"
      >
        <img
            :src="msg.from?.role === 'doctor'
  ? 'https://i.postimg.cc/59Z15zxP/obstetra.avif'
  : 'https://i.postimg.cc/T3MS1qR6/madre.avif'"

            class="avatar"
        />
        <div class="bubble">{{ msg.text }}</div>

        <div v-if="msg.from?.role === 'doctor'" class="menu-container" @click.stop="toggleMenu(msg.id)">
          ⋮
          <div v-if="menuOpen === msg.id" class="menu-dropdown">
            <button @click="deleteMessage(msg.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Input solo si hay paciente -->
    <div v-if="selectedPatientId" class="chat-input">
      <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Escribe tu mensaje..."
      />
      <button @click="sendMessage">➤</button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  width: 900px;
  margin: 0 auto;
  margin-top: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
  height: 90vh;
}

.chat-header {
  background-color: #d4fcd4;
  padding: 12px 20px;
  border-radius: 16px 16px 0 0;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.back-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
}

.patient-list {
  padding: 20px;
}

.patient-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.chat-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  flex-grow: 1;
}

.chat-message {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  max-width: 80%;
  position: relative;
}

.chat-message.doctor {
  flex-direction: row;
  align-self: flex-start;
}

.chat-message.patient {
  flex-direction: row-reverse;
  align-self: flex-end;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.bubble {
  padding: 10px 14px;
  background-color: #f5f5f5;
  border-radius: 16px;
  font-size: 14px;
  max-width: 300px;
  word-wrap: break-word;
}

.chat-message.patient .bubble {
  background-color: #ecffec;
  border: 1px solid #bdf5bd;
}

.menu-container {
  position: relative;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  padding: 0 8px;
  display: flex;
  align-items: center;
}

.menu-dropdown {
  position: absolute;
  top: 24px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  z-index: 10;
}

.menu-dropdown button {
  background: none;
  border: none;
  padding: 8px 16px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
}

.menu-dropdown button:hover {
  background-color: #f5f5f5;
}

.chat-input {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #eee;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.chat-input button {
  background-color: #d4fcd4;
  border: none;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 18px;
  cursor: pointer;
}
</style>