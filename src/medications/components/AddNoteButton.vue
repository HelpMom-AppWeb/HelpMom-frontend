<script setup>
  const emit = defineEmits(['click']);

  const handleClick = () => {
    emit('click');
  };
  </script>

  <template>
    <button class="add-note-btn" @click="handleClick">
      Add Note
    </button>
  </template>

  <style scoped>
  .add-note-btn {
    background-color: #a5f5b9;
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .add-note-btn:hover {
    background-color: #8ae59d;
  }
  </style>
