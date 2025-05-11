import { v4 as uuidv4 } from 'uuid';
import { Recipe } from '../../domain/entities/Recipe';
import { Medication } from '../../domain/entities/Medication';
import { Note } from '../../domain/entities/Note';

export class RecipeService {
    constructor(recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    createRecipe() {
        const recipe = new Recipe(uuidv4(), [new Medication()], []);
        this.recipeRepository.save(recipe);
        return recipe;
    }

    addMedication(recipeId) {
        const recipe = this.recipeRepository.findById(recipeId);
        if (recipe) {
            recipe.addMedication(new Medication());
            this.recipeRepository.save(recipe);
        }
    }

    updateMedication(recipeId, medicationIndex, medicationData) {
        const recipe = this.recipeRepository.findById(recipeId);
        if (recipe) {
            const medication = new Medication(
                medicationData.name,
                medicationData.quantity,
                medicationData.dose,
                medicationData.route,
                medicationData.frequency,
                medicationData.duration
            );
            recipe.updateMedication(medicationIndex, medication);
            this.recipeRepository.save(recipe);
        }
    }

    addNote(recipeId, noteText) {
        const recipe = this.recipeRepository.findById(recipeId);
        if (recipe) {
            const note = new Note(uuidv4(), noteText);
            recipe.addNote(note);
            this.recipeRepository.save(recipe);
        }
    }

    getAllRecipes() {
        return this.recipeRepository.findAll();
    }
}
