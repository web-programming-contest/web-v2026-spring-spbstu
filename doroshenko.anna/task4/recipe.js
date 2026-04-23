//класс рецепта
class Recipe {
    constructor(title, ingredients, steps) {
        this.title = title;
        this.ingredients = ingredients;
        this.steps = steps;
    }
    
    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
    }
    
    removeIngredient(ingredient) {
        let newArray = this.ingredients.filter(item => item != ingredient);
        this.ingredients = newArray;
    }
    
    getIngredientCount() {
        return this.ingredients.length;
    }
}

//группировка по количеству ингредиентов
function groupByIngredients(recipes) {
    let result = new Object();
    for(oneRecipe of recipes) {
        let count = oneRecipe.getIngredientCount();
        if (count in result) {
            result[count].push(oneRecipe);
        } else {
            result[count] = [oneRecipe];
        }
    }
    return result;
}

//возвращает множество уникальных ингредиентов
function uniqueIngredients(recipes) { 
    let result = new Set();
    for (oneRecipe of recipes) {
        let array = oneRecipe.ingredients;
        array.forEach((element) => {result.add(element);});
    }
    return result;
}

//возвращает рецепты, содержащие этот ингредиент
function includeIngredient(ingredient, recipes) {
    let result = [];
    recipes.forEach((element) => {
        if (element.ingredients.includes(ingredient)) {
            result.push(element);
        }
    });
    return result;
}

//группирует по количеству шагов
function groupBySteps(recipes) {
    let result = new Object();
    for(oneRecipe of recipes) {
        let count = oneRecipe.steps.length;
        if (count in result) {
            result[count].push(oneRecipe);
        } else {
            result[count] = [oneRecipe];
        }
    }
    return result;
}

//возвращает названия всех рецептов
function recipesNames(recipes) {
    let result = [];
    recipes.forEach((element) => {result.push(element.title);});
    return result;
}

//глобальная переменная, список рецептов
let recipes = [];

//начальные рецепты
recipes.push(new Recipe("Борщ", ["свекла", "капуста", "картошка"], ["Порезать", "Сварить", "Подавать"]));
recipes.push(new Recipe("Омлет", ["яйца", "молоко"], ["Взбить", "Пожарить"]));

//сохраняем текущие рецепты в local storage
function save() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

//загружаем рецепты из local storage и парсим
function load() {
    let saved = localStorage.getItem('recipes');
    if (saved) {
        let data = JSON.parse(saved);
        recipes = [];
        for (let i = 0; i < data.length; i++) {
            recipes.push(new Recipe(data[i].title, data[i].ingredients, data[i].steps));
        }
    }
    showAll();
}

//показывает рецепты на странице
function showAll() {
    let container = document.getElementById('recipesContainer');
    container.innerHTML = '';
    
    for (let i = 0; i < recipes.length; i++) {
        let r = recipes[i];
        
        //создаём карточку
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card_content">
                <h3>${r.title}</h3>
                <p><strong>Ингредиентов: ${r.getIngredientCount()}</strong></p>
                <p><strong>Шагов: ${r.steps.length}</strong></p>
                
                <p><strong>Ингредиенты:</strong></p>
                <ul>${r.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
                
                <p><strong>Шаги:</strong></p>
                <ol>${r.steps.map(step => `<li>${step}</li>`).join('')}</ol>
                
                <div class="buttons">
                    <button onclick="addIngred(${i})">Добавить ингредиент</button>
                    <button onclick="removeIngred(${i})">Удалить ингредиент</button>
                    <button onclick="addStep(${i})">Добавить шаг</button>
                    <button onclick="removeStep(${i})">Удалить шаг</button>
                    <button onclick="deleteRecipe(${i})">Удалить рецепт</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    }
    save();
}

//функция для задержки
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//добавление ингредиента
async function addIngred(index) {
    let ingred = prompt("Какой ингредиент добавить?");
    if (ingred) {
        await wait(500);
        recipes[index].addIngredient(ingred);
        showAll();
    }
}

//удаление ингредиента
async function removeIngred(index) {
    let r = recipes[index];
    if (r.ingredients.length === 0) {
        alert("Нет ингредиентов!");
        return;
    }
    let ingred = prompt(`Какой удалить? (${r.ingredients.join(", ")})`);
    if (ingred && r.ingredients.includes(ingred)) {
        await wait(500);
        r.removeIngredient(ingred);
        showAll();
    }
}

//добавление шага
async function addStep(index) {
    let step = prompt("Какой шаг добавить?");
    if (step) {
        await wait(500);
        recipes[index].steps.push(step);
        showAll();
    }
}

//удаление шага
async function removeStep(index) {
    let r = recipes[index];
    if (r.steps.length === 0) {
        alert("Нет шагов!");
        return;
    }
    let num = prompt(`Какой шаг удалить? (1-${r.steps.length})`);
    let idx = parseInt(num) - 1;
    if (idx >= 0 && idx < r.steps.length) {
        await wait(500);
        r.steps.splice(idx, 1);
        showAll();
    }
}

//удаление рецептф
async function deleteRecipe(index) {
    if (confirm("Точно удалить?")) {
        await wait(500);
        recipes.splice(index, 1);
        showAll();
    }
}

//создание формы для добавления рецепта
function createForm() {
    let formDiv = document.getElementById('createRecipeForm');
    formDiv.innerHTML = `
        <div class="form-container">
            <h3>Новый рецепт</h3>
            <input type="text" id="newTitle" placeholder="Название"><br><br>
            <input type="text" id="newIngredients" placeholder="Ингредиенты через запятую"><br><br>
            <textarea id="newSteps" placeholder="Шаги через точку с запятой"></textarea><br><br>
            <button onclick="createRecipe()">Создать</button>
        </div>
    `;
}

//создание рецепта из данных формы
function createRecipe() {
    let title = document.getElementById('newTitle').value;
    let ingredientsText = document.getElementById('newIngredients').value;
    let stepsText = document.getElementById('newSteps').value;
    
    if (!title) {
        alert("Введите название!");
        return;
    }
    
    let ingredients = ingredientsText.split(",").map(s => s.trim());
    let steps = stepsText.split(";").map(s => s.trim());
    
    if (ingredients.length === 0 || steps.length === 0) {
        alert("Заполните всё!");
        return;
    }
    
    recipes.push(new Recipe(title, ingredients, steps));
    showAll();

    document.getElementById('newTitle').value = "";
    document.getElementById('newIngredients').value = "";
    document.getElementById('newSteps').value = "";
}
createForm();
save();
load();