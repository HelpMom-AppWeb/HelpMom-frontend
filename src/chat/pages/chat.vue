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
