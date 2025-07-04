<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  recipe: Object
});

const emit = defineEmits(["save-recipe"]);

const handleSave = () => {
  if (props.recipe) emit("save-recipe", props.recipe);
};
</script>

<template>
  <button class="action-button add-recipe" @click="handleSave">
    Save Recipe
  </button>
</template>

<style scoped>
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
  background-color: #75d489;
}
</style>
