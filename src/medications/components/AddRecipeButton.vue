<template>
    <div class="add-recipe-container">
      <button class="add-recipe-btn" @click="$emit('add-recipe')">
        <div class="btn-content">
          <span>{{$t("healthMonitoring.recipes.addRecipe") }}</span>
          <div class="plus-icon">+</div>
        </div>
      </button>
    </div>
  </template>

  <script setup>
  defineEmits(['add-recipe']);
  </script>

  <style scoped>
  .add-recipe-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .add-recipe-btn {
    background-color: #a5f5b9;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .add-recipe-btn:hover {
    background-color: #8ae59d;
  }

  .btn-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .plus-icon {
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    color: #5cb85c;
  }
  </style>
