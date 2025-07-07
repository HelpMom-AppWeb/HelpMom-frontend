<script setup>
import AddRecipeButton from "../components/AddRecipeButton.vue";
import RecipeList from "../components/RecipeList.vue";
import SaveRecipeButton from "../components/SaveRecipeButton.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const recipes = ref([]);
const medications = ref([]);
const savedRecipes = ref([]);

onMounted(() => {
  fetchAllMedications();
  recipes.value = [];
});

const fetchAllMedications = async () => {
  try {
    const response = await axios.get("https://help-mom-platform.azurewebsites.net/api/medication");
    medications.value = response.data;
  } catch (error) {
    console.error("Error fetching medications:", error);
  }
};

const addNewRecipe = () => {
  const newRecipe = {
    id: Date.now(),
    medications: [],
    notes: [],
    newNoteText: ""
  };
  recipes.value.push(newRecipe);
};

const addMedication = (recipeId) => {
  const recipe = recipes.value.find((r) => r.id === recipeId);
  if (recipe) {
    recipe.medications.push({
      id: Date.now(),
      name: "",
      quantity: 0,
      dose: "",
      via: "",
      frequency: "",
      duration: ""
    });
  }
};

const addNote = (recipeId, noteText) => {
  const recipe = recipes.value.find((r) => r.id === recipeId);
  if (recipe && noteText.trim()) {
    recipe.notes.push({ id: Date.now(), text: noteText });
    recipe.newNoteText = "";
  }
};

const deleteRecipe = (recipeId) => {
  recipes.value = recipes.value.filter((recipe) => recipe.id !== recipeId);
};

const deleteMedication = (recipeId, medicationId) => {
  const recipe = recipes.value.find((r) => r.id === recipeId);
  if (recipe) {
    recipe.medications = recipe.medications.filter((med) => med.id !== medicationId);
  }
};

const saveRecipe = (recipe) => {
  const cloned = JSON.parse(JSON.stringify(recipe));
  savedRecipes.value.push(cloned);
};
</script>

<template>
  <div class="container">
    <h1>Medications</h1>

    <div>
      <ul>
        <li v-for="med in medications" :key="med.id">{{ med.name }}</li>
      </ul>
    </div>

    <RecipeList
        :recipes="recipes"
        @add-medication="addMedication"
        @add-note="addNote"
        @delete-medication="deleteMedication"
        @delete-recipe="deleteRecipe"
    />

    <AddRecipeButton @add-recipe="addNewRecipe"/>

    <SaveRecipeButton
        :recipe="recipes[recipes.length - 1]"
        @save-recipe="saveRecipe"
    />

    <!-- Tarjetas guardadas -->
    <div class="saved-recipes">
      <h2>Saved Recipes</h2>

      <div
          v-for="savedRecipe in savedRecipes"
          :key="savedRecipe.id"
          class="saved-recipe-card"
      >
        <h3>Receta ID: {{ savedRecipe.id }}</h3>

        <table class="saved-medication-table">
          <thead>
          <tr>
            <th>Medication</th>
            <th>Quantity</th>
            <th>Dose</th>
            <th>Vía</th>
            <th>Frequency</th>
            <th>Duration</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="med in savedRecipe.medications" :key="med.id">
            <td>{{ med.name }}</td>
            <td>{{ med.quantity }}</td>
            <td>{{ med.dose }}</td>
            <td>{{ med.via }}</td>
            <td>{{ med.frequency }}</td>
            <td>{{ med.duration }}</td>
          </tr>
          </tbody>
        </table>

        <div v-if="savedRecipe.notes.length" class="saved-notes">
          <strong>Notas:</strong>
          <ul>
            <li v-for="note in savedRecipe.notes" :key="note.id">{{ note.text }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.saved-recipes {
  margin-top: 30px;
}
</style>


<style>
.saved-recipe-card {
  background-color: #ffe6e6;
  border: 1px solid #ffb3b3;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(255, 0, 0, 0.1);
}

.saved-recipe-card h3 {
  font-size: 1.1rem;
  color: #b30000;
  margin-bottom: 10px;
}

.saved-medication-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.saved-medication-table th,
.saved-medication-table td {
  border: 1px solid #ffcccc;
  padding: 8px;
  text-align: center;
  background-color: #fff;
}

.saved-medication-table th {
  background-color: #ffd6d6;
  color: #800000;
}

.saved-notes {
  margin-top: 10px;
  background-color: #fff0f0;
  padding: 10px;
  border-left: 4px solid #ff9999;
  border-radius: 5px;
}

.saved-notes ul {
  margin: 0;
  padding-left: 20px;
}
</style>
