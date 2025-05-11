<script setup>
import RecipeCard from './RecipeCard.vue';

defineProps({
  recipes: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['add-medication', 'add-note']);

const handleAddMedication = (recipeId) => {
  emit('add-medication', recipeId);
};

const handleAddNote = (recipeId, noteText) => {
  emit('add-note', recipeId, noteText);
};
</script>

<template>
  <div class="recipe-list">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
      @add-medication="handleAddMedication"
      @add-note="handleAddNote"
    />
  </div>
</template>

<style scoped>
.recipe-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}
</style>
