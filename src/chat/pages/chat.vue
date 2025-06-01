<script>
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
  }
};
</script>

<template>
  <div class="chat-container">
    <div class="chat-header">Paciente: {{ patientName }}</div>
  </div>
</template>
