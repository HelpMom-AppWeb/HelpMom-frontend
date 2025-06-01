<script setup>
    const emit = defineEmits(['add-recipe']);

    const handleAddRecipe = () => {
      emit('add-recipe');
    };
    </script>

    <template>
      <button class="add-recipe-btn" @click="handleAddRecipe">
        <span class="add-recipe-text">Add Recipe</span>
        <span class="add-recipe-icon">+</span>
      </button>
    </template>

    <style scoped>
    .add-recipe-btn {
      background-color: #a5f5b9;
      border: none;
      padding: 8px 15px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.2s;
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }

    .add-recipe-btn:hover {
      background-color: #8ae59d;
    }

    .add-recipe-text {
      font-size: 0.9rem;
      font-weight: bold;
    }

    .add-recipe-icon {
      font-size: 1.2rem;
      font-weight: bold;
    }
    </style>
