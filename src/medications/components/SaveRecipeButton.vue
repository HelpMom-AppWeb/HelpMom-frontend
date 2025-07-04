<script setup>
    import { defineProps, defineEmits } from "vue";

    defineProps({
      recipe: Object, // Recibe la receta como prop
    });

    const emit = defineEmits(["save-recipe"]);

    const handleSave = () => {
      emit("save-recipe", recipe);
    };
    </script>

    <template>
      <button class="action-button add-recipe" @click="handleSave">
        Save Recipe
      </button>
    </template>

    <style>
    .action-button {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
    }

    .action-button:hover {
      background-color: #0056b3;
    }

    .add-recipe {
      background-color: #8ae59d;
    }

    .add-recipe:hover {
      background-color: #8ae59d;
    }
    </style>
