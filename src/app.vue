<script setup>
            import { ref, onMounted } from 'vue';
            import RecipeList from './public/components/RecipeList.vue';
            import AddRecipeButton from './public/components/AddRecipeButton.vue';
            import { RecipeRepository } from './domain/repositories/RecipeRepository';
            import { RecipeService } from './application/services/RecipeService';

            const recipeRepository = new RecipeRepository();
            const recipeService = new RecipeService(recipeRepository);

            const recipes = ref([]);

            onMounted(() => {
              recipes.value = recipeService.getAllRecipes();
            });

            const addNewRecipe = () => {
              const newRecipe = recipeService.createRecipe();
              if (newRecipe) {
                recipes.value = [...recipes.value, newRecipe];
              }
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
            </script>

            <template>
              <div class="container">
                <h1>List of Recipes</h1>
                <RecipeList :recipes="recipes" @add-medication="addMedication" @add-note="addNote" />
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
