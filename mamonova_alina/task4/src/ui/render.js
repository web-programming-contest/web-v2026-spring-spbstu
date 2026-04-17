import { restaurants } from "../store/store.js";
import {
  groupRestaurantsByDishCount,
  getAllUniqueDishes,
  groupDishesByPriceRange,
  getRestaurantsWithMostExpensiveDish,
} from "../services/restaurantService.js";

export function renderCards() {
  const container = document.getElementById("app");
  if (!container) return;

  if (restaurants.length === 0) {
    container.innerHTML = `<div class="empty-state empty-state-full">Нет ресторанов</div>`;
    return;
  }

  container.innerHTML = restaurants
    .map((rest, idx) => {
      const menuItems = rest.menu
        .map(
          (dish) => `
            <li class="dish-item">
                <span class="dish-info">${dish.name}</span>
                <div class="dish-actions">
                    <span class="dish-price">${dish.price} ₽</span>
                    <button class="btn-icon remove-dish-btn" data-rest-index="${idx}" data-dish-name="${dish.name}">Удалить</button>
                </div>
            </li>
        `,
        )
        .join("");

      return `
            <div class="restaurant-card" data-rest-card-index="${idx}">
                <div class="card-header">
                    <span class="restaurant-name">${rest.name}</span>
                    <span class="menu-badge">${rest.menuSize} шт.</span>
                </div>
                <div class="card-body">
                    <div class="menu-title">Меню</div>
                    <ul class="dish-list">
                        ${menuItems || '<li class="empty-state">Нет блюд</li>'}
                    </ul>
                    <div class="card-actions">
                        <button class="btn btn-primary open-dish-modal-btn" data-rest-index="${idx}">Добавить блюдо</button>
                        <button class="btn btn-danger delete-rest-btn" data-rest-index="${idx}">Удалить ресторан</button>
                    </div>
                </div>
            </div>
        `;
    })
    .join("");
}

export function renderAnalytics() {
  const analyticsDiv = document.getElementById("analyticsContent");
  if (!analyticsDiv) return;

  const groupCount = groupRestaurantsByDishCount();
  const uniqueDishes = getAllUniqueDishes();
  const priceGroups = groupDishesByPriceRange();
  const mostExpensiveRest = getRestaurantsWithMostExpensiveDish();

  const groupCountHtml = groupCount.length
    ? groupCount
        .map(
          ([count, names]) =>
            `<div><strong>Кол-во блюд: ${count}: </strong> ${names.join(", ")}</div>`,
        )
        .join("")
    : '<div class="empty-state">Нет ресторанов</div>';

  const uniqueHtml = uniqueDishes.length
    ? `<ul class="card-body">${uniqueDishes.map((d) => `<li>${d.name}</li>`).join("")}</ul>`
    : '<div class="empty-state">Нет данных</div>';

  const priceHtml = Object.entries(priceGroups)
    .map(([range, dishes]) => {
      return `
        <div>
            <strong>${range}</strong>
            ${
              dishes.length
                ? `<ul class="card-body">
                    ${dishes.map((d) => `<li>${d.dishName} (${d.price}) — ${d.restaurant}</li>`).join("")}
                   </ul>`
                : "<div>—</div>"
            }
        </div>`;
    })
    .join("");

  const expensiveHtml = mostExpensiveRest.length
    ? mostExpensiveRest
        .map((r) => {
          if (!r.hasDishes) {
            return `<div><strong>${r.name}</strong>: меню пусто</div>`;
          }
          return `
            <div>
                <strong>${r.name}</strong>
                <ul class="card-body">
                    ${r.dishes.map((d) => `<li>${d.name} (${d.price}₽)</li>`).join("")}
                </ul>
            </div>`;
        })
        .join("")
    : '<div class="empty-state">Нет ресторанов</div>';

  analyticsDiv.innerHTML = `
        <div class="analytics-card"><h3>Группировка по кол-ву блюд</h3>${groupCountHtml}</div>
        <div class="analytics-card"><h3>Уникальные блюда</h3>${uniqueHtml}</div>
        <div class="analytics-card"><h3>Блюда по ценовым диапазонам</h3>${priceHtml}</div>
        <div class="analytics-card"><h3>Рестораны с самым дорогим блюдом</h3>${expensiveHtml}</div>
    `;
}

export function updateSearchResult(dishName, matchedRestaurants) {
  const resultDiv = document.getElementById("searchResultDisplay");
  if (!resultDiv) return;
  if (!dishName.trim() || matchedRestaurants.length === 0) {
    resultDiv.innerHTML = dishName.trim()
      ? `<span class="search-error">Рестораны с блюдом «${dishName}» не найдены</span>`
      : "";
  } else {
    resultDiv.innerHTML = `<strong>Найдено в ${matchedRestaurants.length} ресторанах:</strong> ${matchedRestaurants.map((r) => r.name).join(", ")}`;
  }
}
