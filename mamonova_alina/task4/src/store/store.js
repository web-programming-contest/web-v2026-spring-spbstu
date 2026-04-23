import { Restaurant } from "../entities/restaurant.js";
import { Dish } from "../entities/dish.js";
import {
  restNameMaxLen,
  dishNameMaxLen,
  priceMaxLen,
} from "../ui/validation.js";
import { errors } from "../errors/errors.js";

export let restaurants = [];

export function save() {
  const data = restaurants.map((r) => ({
    _name: r.name,
    _menu: r.menu.map((d) => ({ _name: d.name, _price: d.price })),
  }));
  localStorage.setItem("restaurants_manager", JSON.stringify(data));
}

export function load() {
  const rawData = JSON.parse(localStorage.getItem("restaurants_manager")) || [];
  restaurants = [];
  for (const rData of rawData) {
    try {
      let restName = rData._name;
      if (restName.length > restNameMaxLen)
        throw new Error(errors.invalidRestaurantNameLength);

      const rest = new Restaurant(restName);
      for (const d of rData._menu) {
        if (d._name.length > dishNameMaxLen)
          throw new Error(errors.invalidDishNameLength);

        if (d._price < 1 || d._price > priceMaxLen)
          throw new Error(errors.invalidPrice);
        rest.addDish(new Dish(d._name, d._price));
      }

      restaurants.push(rest);
    } catch (e) {
      console.warn("Пропущен ресторан", rData._name, e.message);
    }
  }
}
