<script setup>
          import AddRecipeButton from "../components/AddRecipeButton.vue";
          import RecipeList from "../components/RecipeList.vue";
          import { ref, onMounted } from "vue";
          import axios from "axios";

          const recipes = ref([]);
          const medications = ref([]);

          onMounted(() => {
            fetchAllMedications();
            recipes.value = [];
          });

          const fetchAllMedications = async () => {
            try {
              const response = await axios.get("http://localhost:3000/api/medication");
              medications.value = response.data;
            } catch (error) {
              console.error("Error fetching all medications:", error);
            }
          };

          const addNewRecipe = () => {
            const newRecipe = {
              id: Date.now(),
              medications: [],
              notes: []
            };
            recipes.value.push(newRecipe);
          };

          const addMedication = (recipeId) => {
            const recipe = recipes.value.find((r) => r.id === recipeId);
            if (recipe) {
              recipe.medications.push({});
            }
          };

          const addNote = (recipeId, noteText) => {
            const recipe = recipes.value.find((r) => r.id === recipeId);
            if (recipe) {
              recipe.notes.push({ id: Date.now(), text: noteText });
            }
          };

          const deleteMedication = (recipeId, medicationIndex) => {
            const recipe = recipes.value.find((r) => r.id === recipeId);
            if (recipe) {
              recipe.medications.splice(medicationIndex, 1);
            }
          };

          const deleteRecipe = (recipeId) => {
            recipes.value = recipes.value.filter((recipe) => recipe.id !== recipeId);
          };
          </script>

          <template>
            <div class="container">
              <h1>Medications</h1>
              <div>
                <ul>
                  <li v-for="medication in medications" :key="medication.id">{{ medication.name }}</li>
                </ul>
              </div>

              <RecipeList
                :recipes="recipes"
                @add-medication="addMedication"
                @add-note="addNote"
                @delete-medication="deleteMedication"
                @delete-recipe="deleteRecipe"
              />
              <AddRecipeButton @add-recipe="addNewRecipe" />
            </div>
          </template>

          <style>
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
          </style>
