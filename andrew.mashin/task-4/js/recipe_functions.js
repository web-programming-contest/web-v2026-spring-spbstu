// Реализовать функцию, которая группирует рецепты по количеству ингредиентов
function groupRecipesByIngredientCount(recipes) {
    const groups = {};
    recipes.forEach(recipe => {
        const count = recipe.ingredientCount();
        if (!groups[count]) {
            groups[count] = [];
        }
        groups[count].push(recipe);
    });
    return groups;
}


// Реализовать функцию, которая возвращает уникальный список всех ингредиентов
function getUniqueIngredients(recipes) {
    const ingredientSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => ingredientSet.add(ingredient));
    });
    return Array.from(ingredientSet);
}


// Реализовать функцию, которая возвращает рецепты, содержащие заданный ингредиент
function findRecipesByIngredient(recipes, ingredient) {
    return recipes.filter(recipe => recipe.ingredients.includes(ingredient));
}


// Реализовать функцию, которая группирует рецепты по длине списка шагов
function groupRecipesByStepsCount(recipes) {
    const groups = {};
    recipes.forEach(recipe => {
        const stepsCount = recipe.steps.length;
        if (!groups[stepsCount]) {
            groups[stepsCount] = [];
        }
        groups[stepsCount].push(recipe);
    });
    return groups;
}


// Реализовать функцию, которая возвращает список всех названий рецептов
function getRecipesNames(recipes) {
    return recipes.map(recipe => recipe.title);
}