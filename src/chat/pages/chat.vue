<script>
import axios from 'axios';

export default {
  props: {
    patientId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      patientName: '',
      menuOpen: null // ID del mensaje cuyo menú está abierto
    };
  },
  async mounted() {
    document.addEventListener('click', this.closeMenuOutside);
    await this.fetchMessages();
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeMenuOutside);
  },
  methods: {
    async fetchMessages() {
      const res = await axios.get('http://localhost:3000/messages');
      this.messages = res.data.filter(msg => msg.patientId === this.patientId);

      const patientRes = await axios.get(`http://localhost:3000/patients/${this.patientId}`);
      this.patientName = patientRes.data.name;
    },
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      const message = {
        from: 'doctor',
        text: this.newMessage,
        timestamp: Date.now(),
        patientId: this.patientId
      };

      await axios.post('http://localhost:3000/messages', message);
      this.newMessage = '';
      await this.fetchMessages();
    },
    toggleMenu(id) {
      this.menuOpen = this.menuOpen === id ? null : id;
    },
    async deleteMessage(id) {
      try {
        await axios.delete(`http://localhost:3000/messages/${id}`);
        this.messages = this.messages.filter(msg => msg.id !== id);
        this.menuOpen = null; // cerrar menú después de eliminar
      } catch (error) {
        console.error('Error eliminando mensaje:', error);
      }
    },
    closeMenuOutside(event) {
      // Si el clic no fue dentro de este componente, cerrar menú
      if (!this.$el.contains(event.target)) {
        this.menuOpen = null;
      }
    }
  }
};
</script>

<template>
  <div class="chat-container">
    <div class="chat-header">Paciente: {{ patientName }}</div>

    <div class="chat-body">
      <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['chat-message', msg.from === 'doctor' ? 'doctor' : 'patient']"
      >
        <img
            :src="msg.from === 'doctor' ? 'https://i.postimg.cc/59Z15zxP/obstetra.avif' : 'https://i.postimg.cc/T3MS1qR6/madre.avif'"
            class="avatar"
        />
        <div class="bubble">{{ msg.text }}</div>

        <!-- Botón menú 3 puntitos -->
        <div class="menu-container" @click.stop="toggleMenu(msg.id)">
          ⋮
          <div v-if="menuOpen === msg.id" class="menu-dropdown">
            <button @click="deleteMessage(msg.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-input">
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
