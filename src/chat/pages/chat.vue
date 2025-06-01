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
      menuOpen: null
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
        this.menuOpen = null;
      } catch (error) {
        console.error('Error eliminando mensaje:', error);
      }
    },
    closeMenuOutside(event) {
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
          class="chat-message"
      >
        {{ msg.text }}

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
