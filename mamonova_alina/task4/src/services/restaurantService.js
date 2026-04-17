import { restaurants, save } from "../store/store.js";
import { Restaurant } from "../entities/restaurant.js";
import { Dish } from "../entities/dish.js";
import { errors } from "../errors/errors.js";
import { dishNameMaxLen } from "../ui/validation.js";

const PRICE_CONFIG = [
  { label: "Дешевые (до 500₽)", max: 500 },
  { label: "Средние (до 1000₽)", max: 1000 },
  { label: "Дорогие (от 1000₽)", max: Infinity },
];

export function addRestaurantSync(name) {
  if (!name.trim()) throw new Error(errors.emptyRestaurantName);
  const exists = restaurants.some(
    (r) => r.name.toLowerCase() === name.trim().toLowerCase(),
  );

  if (exists) throw new Error(errors.existedRestaurantName);

  const newRest = new Restaurant(name.trim());
  restaurants.push(newRest);
  save();
}

export function removeRestaurantSync(index) {
  if (index >= 0 && index < restaurants.length) {
    restaurants.splice(index, 1);
    save();
  }
}

export function addDishToRestaurantSync(restIndex, dishName, price) {
  if (restIndex < 0 || restIndex >= restaurants.length)
    throw new Error(errors.restaurantNotFound);

  if (!dishName.trim()) throw new Error(errors.emptyDishName);

  const trimmedName = dishName.trim();
  if (trimmedName.length > dishNameMaxLen)
    throw new Error(errors.invalidDishNameLength);

  if (isNaN(price) || price <= 0) throw new Error(errors.invalidDishPrice);

  const newDish = new Dish(trimmedName, Number(price));
  restaurants[restIndex].addDish(newDish);
  save();
}

export function removeDishFromRestaurantSync(restIndex, dishName) {
  if (restIndex >= 0 && restIndex < restaurants.length) {
    restaurants[restIndex].removeDish(dishName);
    save();
  }
}

export function groupRestaurantsByDishCount() {
  const groups = new Map();
  restaurants.forEach((r) => {
    const count = r.menuSize;
    if (!groups.has(count)) groups.set(count, []);
    groups.get(count).push(r.name);
  });

  return Array.from(groups.entries()).sort((a, b) => a[0] - b[0]);
}

export function getAllUniqueDishes() {
  const dishMap = new Map();

  restaurants.forEach((rest) => {
    rest.menu.forEach((dish) => {
      if (!dishMap.has(dish.name)) {
        dishMap.set(dish.name, dish.price);
      }
    });
  });

  return Array.from(dishMap.entries()).map(([name, price]) => ({
    name,
    price,
  }));
}

export function groupDishesByPriceRange() {
  const ranges = Object.fromEntries(PRICE_CONFIG.map((cfg) => [cfg.label, []]));

  restaurants.forEach((rest) => {
    rest.menu.forEach((dish) => {
      const range = PRICE_CONFIG.find((cfg) => dish.price < cfg.max);

      ranges[range.label].push({
        dishName: dish.name,
        price: dish.price,
        restaurant: rest.name,
      });
    });
  });

  return ranges;
}

export function getRestaurantsWithMostExpensiveDish() {
  return restaurants.map((restaurant) => {
    if (restaurant.menu.length === 0) {
      return {
        name: restaurant.name,
        hasDishes: false,
        maxPrice: null,
        dishes: [],
      };
    }

    let maxPrice = -1;
    restaurant.menu.forEach((dish) => {
      if (dish.price > maxPrice) maxPrice = dish.price;
    });

    const expensiveDishes = restaurant.menu
      .filter((dish) => dish.price === maxPrice)
      .map((dish) => ({
        name: dish.name,
        price: dish.price,
      }));

    return {
      name: restaurant.name,
      hasDishes: true,
      maxPrice: maxPrice,
      dishes: expensiveDishes,
    };
  });
}

export function getRestaurantsContainingDish(dishName) {
  if (!dishName.trim()) return [];

  const searchLower = dishName.trim().toLowerCase();
  return restaurants.filter((r) =>
    r.menu.some((d) => d.name.toLowerCase().includes(searchLower)),
  );
}
