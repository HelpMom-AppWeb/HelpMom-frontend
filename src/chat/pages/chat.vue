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
      patientName: ''
    };
  },
  async mounted() {
    await this.fetchMessages();
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
