<script setup>
                        import AddRecipeButton from "../components/AddRecipeButton.vue";
                        import RecipeList from "../components/RecipeList.vue";
                        import SaveRecipeButton from "../components/SaveRecipeButton.vue";
                        import { ref, onMounted } from "vue";
                        import axios from "axios";

                        const recipes = ref([]);
                        const medications = ref([]);
                        const savedRecipes = ref([]); // Lista de recetas guardadas

                        onMounted(() => {
                          fetchAllMedications();
                          recipes.value = [];
                        });

                        const fetchAllMedications = async () => {
                          try {
                            const response = await axios.get("http://localhost:5128/api/medication");
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
                            recipe.medications.push({ id: Date.now(), name: "", quantity: 0, dose: "" });
                          }
                        };

                        const addNote = (recipeId, noteText) => {
                          const recipe = recipes.value.find((r) => r.id === recipeId);
                          if (recipe) {
                            recipe.notes.push({ id: Date.now(), text: noteText });
                          }
                        };

                        const deleteRecipe = (recipeId) => {
                          recipes.value = recipes.value.filter((recipe) => recipe.id !== recipeId);
                        };

                        const deleteMedication = (recipeId, medicationId) => {
                          console.log("Intentando eliminar medicamento:", { recipeId, medicationId }); // Depuración
                          const recipeIndex = recipes.value.findIndex((r) => r.id === recipeId);
                          if (recipeIndex !== -1) {
                            const medicationIndex = recipes.value[recipeIndex].medications.findIndex((medication) => medication.id === medicationId);
                            if (medicationIndex !== -1) {
                              recipes.value[recipeIndex].medications.splice(medicationIndex, 1); // Actualización reactiva
                              console.log("Medicamento eliminado. Receta actualizada:", recipes.value[recipeIndex].medications);
                            } else {
                              console.error("Medicamento no encontrado:", medicationId);
                            }
                          } else {
                            console.error("Receta no encontrada:", recipeId);
                          }
                        };

                        const saveRecipe = async (recipe) => {
                          try {
                            await axios.post("http://localhost:5128/api/recipes", recipe);
                            savedRecipes.value.push(recipe); // Agregar la receta a la lista de tarjetas
                            console.log("Receta guardada:", recipe);
                          } catch (error) {
                            console.error("Error al guardar la receta:", error);
                          }
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

                            <SaveRecipeButton
                              :recipe="recipes[recipes.length - 1]"
                              @save-recipe="saveRecipe"
                            />

                            <div class="saved-recipes">
                                <h2>Saved Recipes</h2>
                              <div v-for="savedRecipe in savedRecipes" :key="savedRecipe.id" class="recipe-card">
                                <h3>Receta ID: {{ savedRecipe.id }}</h3>
                                <ul>
                                  <li v-for="medication in savedRecipe.medications" :key="medication.id">
                                    Medicamento: {{ medication.name }}, Cantidad: {{ medication.quantity }}, Dosis: {{ medication.dose }}
                                    <button @click="deleteMedication(savedRecipe.id, medication.id)" class="delete-button">Eliminar</button>
                                  </li>
                                </ul>
                                <ul>
                                  <li v-for="note in savedRecipe.notes" :key="note.id">
                                    Nota: {{ note.text }}
                                  </li>
                                </ul>
                              </div>
                            </div>
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

                        .saved-recipes {
                          margin-top: 30px;
                        }

                        .recipe-card {
                          border: 1px solid #ccc;
                          border-radius: 5px;
                          padding: 15px;
                          margin-bottom: 10px;
                          background-color: #f9f9f9;
                        }

                        .delete-button {
                          background-color: #dc3545;
                          color: white;
                          border: none;
                          border-radius: 3px;
                          padding: 5px 10px;
                          cursor: pointer;
                          font-size: 0.9rem;
                        }

                        .delete-button:hover {
                          background-color: #c82333;
                        }
                        </style>
