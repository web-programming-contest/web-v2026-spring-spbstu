const recipesJson = JSON.parse(localStorage.getItem('recipes')) || [];
let recipes = [];
for (const key in recipesJson) {
  recipes[key] = Object.assign(new Recipe(), recipesJson[key]);
}

renderRecipes();

window.addEventListener('storage', (event) => {
    if (event.key == 'recipes') {
        recipes = JSON.parse(event.newValue) || [];
        renderRecipes();
    }
});


// Рендеринг рецептов на странице
function renderRecipes() {
    const container = document.querySelector('.recipes');
    container.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <h2>${recipe.title}</h2>
            <ul>
                <li><i>Ингредиенты:</i></li>
                <ul>
                    ${recipe.ingredients.map(ingredient =>
                        `<li class="recipe-input-form ingredient-item">
                            <span>${ingredient}</span>
                            <button class="recipe-btn delete-ingredient-btn" type="button">-</button>
                        </li>`).join('\n')}
                    <div class="recipe-input-form new-ingredient-form">
                        <input type="text" class="new-ingredient-input" name="new-ingredient" placeholder="Добавить ингредиент">
                        <button class="recipe-btn add-ingredient-btn" type="button">+</button>
                    </div>
                </ul>
                <li><i>Шаги:</i></li>
                <ul>
                    ${recipe.steps.map((step, index) =>
                        `<li class="recipe-input-form step-item">
                            <span>Шаг ${index + 1}: ${step}</span>
                            <button class="recipe-btn delete-step-btn" type="button">-</button>
                        </li>`).join('\n')}
                    <div class="recipe-input-form new-step-form">
                        <input type="text" class="new-step-input" name="new-step" placeholder="Добавить шаг">
                        <button class="recipe-btn add-step-btn" type="button">+</button>
                    </div>
                </ul>
                <li><i>Количество ингредиентов:</i> ${recipe.ingredientCount()}</li>
                <li><i>Количество шагов:</i> ${recipe.steps.length}</li>
            </ul>
            <button class="delete-recipe-btn" type="button">Удалить рецепт</button>
        `;
        container.appendChild(recipeDiv);
    });
}


// Функция для добавления нового рецепта
function addRecipe(title, ingredients, steps) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newRecipe = new Recipe(title, ingredients, steps);
            localStorage.setItem('recipes', JSON.stringify([...recipes, newRecipe]));
            recipes = [...recipes, newRecipe];
            resolve(newRecipe);
        }, 1000);
    });
}


// Функция для добавления ингредиента в рецепт
function addIngredientToRecipe(title, ingredient) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const recipe = recipes.find(r => r.title == title);
            if (recipe) {
                recipe.addIngredient(ingredient);
                localStorage.setItem('recipes', JSON.stringify(recipes));
                resolve();
            }
            reject(new Error('Рецепт не найден'));
        }, 1000);
    });
}


// Функция для добавления шага в рецепт
function addStepToRecipe(title, step) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const recipe = recipes.find(r => r.title == title);
            if (recipe) {
                recipe.steps.push(step);
                localStorage.setItem('recipes', JSON.stringify(recipes));
                resolve();
            }
            reject(new Error('Рецепт не найден'));
        }, 1000);
    });
}


// Функция для удаления рецепта
function deleteRecipe(title) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = recipes.findIndex(recipe => recipe.title == title);
            if (index != -1) {
                recipes.splice(index, 1);
                localStorage.setItem('recipes', JSON.stringify(recipes));
                resolve();
            }
            reject(new Error('Рецепт не найден'));
        }, 500);
    });
}


// Функция для удаления ингредиента из рецепта
function deleteIngredientFromRecipe(title, ingredient) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const recipe = recipes.find(r => r.title == title);
            if (recipe) {
                recipe.removeIngredient(ingredient);
                localStorage.setItem('recipes', JSON.stringify(recipes));
                resolve();
            } else {
                reject(new Error('Рецепт не найден'));
            }
        }, 500);
    });
}


// Функция для удаления шага из рецепта
function deleteStepFromRecipe(title, step) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const recipe = recipes.find(r => r.title == title);
            if (recipe) {
                const index = recipe.steps.indexOf(step);
                if (index != -1) {
                    recipe.steps.splice(index, 1);
                    localStorage.setItem('recipes', JSON.stringify(recipes));
                    resolve();
                } else {
                    reject(new Error('Шаг не найден в рецепте'));
                }
            } else {
                reject(new Error('Рецепт не найден'));
            }
        }, 500);
    });
}


// Нажатие на кнопку "Добавить рецепт"
document.getElementById('add-recipe-btn').addEventListener('click', () => {
    const titleForm = document.getElementById('recipe-name');
    const ingredientsForm = document.getElementById('ingredients');
    const stepsForm = document.getElementById('steps');

    if (!titleForm.value || !ingredientsForm.value || !stepsForm.value) {
        alert('Пожалуйста, заполните все поля формы!');
        return;
    }

    const title = titleForm.value;
    const ingredients = ingredientsForm.value.split(',').map(i => i.trim()).filter(i => i);
    const steps = stepsForm.value.split(',').map(s => s.trim()).filter(s => s);

    titleForm.value = '';
    ingredientsForm.value = '';
    stepsForm.value = '';

    addRecipe(title, ingredients, steps).then(newRecipe => {
        renderRecipes();
    }).catch(error => {
        console.error('Ошибка при добавлении рецепта:', error);
    });
});



document.querySelector('.recipes').addEventListener('click', (event) => {
    const recipeElement = event.target.closest('.recipe');
    if (!recipeElement) return;

    const title = recipeElement.querySelector('h2').textContent;

    // Нажатие на кнопку "Добавить ингредиент"
    if (event.target.matches('.add-ingredient-btn')) {
        const input = event.target.closest('.recipe').querySelector('.new-ingredient-input');
        const newIngredient = input.value.trim();

        if (newIngredient) {
            addIngredientToRecipe(title, newIngredient).then(() => {
                input.value = '';
                renderRecipes();
            }).catch(error => {
                console.error('Ошибка при добавлении ингредиента:', error);
            });
        } else {
            alert('Пожалуйста, введите название ингредиента!');
        }
    }

    // Нажатие на кнопку "Добавить шаг"
    if (event.target.matches('.add-step-btn')) {
        const input = event.target.closest('.recipe').querySelector('.new-step-input');
        const newStep = input.value.trim();

        if (newStep) {
            addStepToRecipe(title, newStep).then(() => {
                input.value = '';
                renderRecipes();
            }).catch(error => {
                console.error('Ошибка при добавлении шага:', error);
            });
        } else {
            alert('Пожалуйста, введите текст шага!');
        }
    }

    // Нажатие на кнопку "Удалить ингредиент"
    if (event.target.matches('.delete-ingredient-btn')) {
        const ingredient = event.target.closest('.ingredient-item').querySelector('span').textContent;
        
        deleteIngredientFromRecipe(title, ingredient).then(() => {
            renderRecipes();
        }).catch(error => {
            console.error('Ошибка при удалении ингредиента:', error);
        });
    }

    // Нажатие на кнопку "Удалить шаг"
    if (event.target.matches('.delete-step-btn')) {
        const step = event.target.closest('.step-item').querySelector('span').textContent.replace(/^Шаг \d+: /, '');
        deleteStepFromRecipe(title, step).then(() => {
            renderRecipes();
        }).catch(error => {
            console.error('Ошибка при удалении шага:', error);
        });
    }

    // Нажатие на кнопку "Удалить рецепт"
    if (event.target.matches('.delete-recipe-btn')) {
        deleteRecipe(title).then(() => {
            renderRecipes();
        }).catch(error => {
            console.error('Ошибка при удалении рецепта:', error);
        });
    }    
});