<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  recipes: Array
});

const emit = defineEmits(["add-medication", "add-note", "delete-recipe", "delete-medication"]);
</script>

<template>
  <div v-for="recipe in recipes" :key="recipe.id" class="recipe-form">
    <table>
      <thead>
      <tr>
        <th>Medication/Concentration</th>
        <th>Quantity</th>
        <th>Dose</th>
        <th>Vía</th>
        <th>Frequency</th>
        <th>Duration</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="med in recipe.medications" :key="med.id">
        <td><input v-model="med.name" /></td>
        <td><input type="number" v-model="med.quantity" /></td>
        <td><input v-model="med.dose" /></td>
        <td><input v-model="med.via" /></td>
        <td><input v-model="med.frequency" /></td>
        <td><input v-model="med.duration" /></td>
        <td><button @click="emit('delete-medication', recipe.id, med.id)">Delete</button></td>
      </tr>
      </tbody>
    </table>

    <div>
      <button @click="emit('add-medication', recipe.id)">Add Medication</button>
      <input v-model="recipe.newNoteText" placeholder="Add note" />
      <button @click="emit('add-note', recipe.id, recipe.newNoteText)">Add Note</button>
    </div>

    <button @click="emit('delete-recipe', recipe.id)" class="delete-recipe">Delete Recipe</button>
  </div>
</template>

<style scoped>
.recipe-form {
  background-color: #ffe6e6;
  border: 1px solid #ffcccc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 6px;
  text-align: center;
}

input {
  width: 100%;
  padding: 5px;
}

button {
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  margin: 4px;
  cursor: pointer;
}

.delete-recipe {
  background-color: #ff6666;
  color: white;
}
</style>
