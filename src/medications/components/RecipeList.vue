<script setup>
import RecipeCard from './RecipeCard.vue';

defineProps({
  recipes: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['add-medication', 'add-note', 'delete-medication']);

const handleAddMedication = (recipeId) => {
  emit('add-medication', recipeId);
};

const handleAddNote = (recipeId, noteText) => {
  emit('add-note', recipeId, noteText);
};

const handleDeleteMedication = (recipeId, medicationIndex) => {
  emit('delete-medication', recipeId, medicationIndex);
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
      @delete-medication="handleDeleteMedication"
    />
  </div>
</template>
