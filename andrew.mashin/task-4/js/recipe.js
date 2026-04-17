class Recipe {
    constructor(title, ingredients, steps) {
        this.title = title;
        this.ingredients = ingredients; 
        this.steps = steps;
    }

    addIngredient(ingredient) {
        if (!this.ingredients.includes(ingredient)) {
            this.ingredients.push(ingredient);
        }
    }

    removeIngredient(ingredient) {
        const index = this.ingredients.indexOf(ingredient);
        if (index !== -1) {
            this.ingredients.splice(index, 1);
        }
    }

    ingredientCount() {
        return this.ingredients.length;
    }
}