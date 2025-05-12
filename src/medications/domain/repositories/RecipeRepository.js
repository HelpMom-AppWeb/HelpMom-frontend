export class RecipeRepository {
    constructor() {
        this.recipes = [];
    }

    save(recipe) {
        const index = this.recipes.findIndex(r => r.id === recipe.id);
        if (index !== -1) {
            this.recipes[index] = recipe;
        } else {
            this.recipes.push(recipe);
        }
    }

    findById(id) {
        return this.recipes.find(recipe => recipe.id === id);
    }

    findAll() {
        return this.recipes;
    }
}
