<template>
  <div class="chat-container">
    <div class="chat-header">Doctor Susana</div>

    <div class="chat-body">
      <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['chat-message', msg.type]"
      >
        <img v-if="msg.avatar" :src="msg.avatar" class="avatar" />
        <div class="bubble">{{ msg.text }}</div>
      </div>
    </div>

    <div class="chat-input">
      <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          :placeholder="$t('chat.placeholder')"
      />
      <button @click="sendMessage">➤</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const doctorAvatar = 'https://i.postimg.cc/59Z15zxP/obstetra.avif';
const patientAvatar = 'https://i.postimg.cc/T3MS1qR6/madre.avif';

const messages = ref([
  { text: "So, are you ready for your next appointment?", type: "doctor", avatar: doctorAvatar },
  { text: "Of course! When do you have availability?", type: "patient", avatar: patientAvatar },
  { text: "Does next week work for you?", type: "doctor", avatar: doctorAvatar },
  { text: "Sure!", type: "patient", avatar: patientAvatar },
]);

const newMessage = ref("");

function sendMessage() {
  if (newMessage.value.trim() !== "") {
    messages.value.push({
      text: newMessage.value,
      type: "patient",
      avatar: patientAvatar,
    });
    newMessage.value = "";
  }
}
</script>

<style scoped>
.chat-container {
  width: 900px;
  margin: 40px auto;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
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
  max-height: 400px;
  overflow-y: auto;
}

.chat-message {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  max-width: 80%;
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
  max-width: 240px;
  word-wrap: break-word;
}

.chat-message.patient .bubble {
  background-color: #ecffec;
  border: 1px solid #bdf5bd;
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
