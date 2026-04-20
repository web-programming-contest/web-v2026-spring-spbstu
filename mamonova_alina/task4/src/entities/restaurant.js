import { Dish } from "./dish.js";
import { errors } from "../errors/errors.js";
import { restNameMaxLen } from "../ui/validation.js";

export class Restaurant {
  constructor(name) {
    this.name = name;
    this._menu = [];
  }

  get name() {
    return this._name;
  }

  get menu() {
    return this._menu;
  }

  get menuSize() {
    return this._menu.length;
  }

  set name(value) {
    if (typeof value !== "string" || !value.trim()) {
      throw new TypeError(errors.emptyRestaurantName);
    }

    const trimmed = value.trim();
    if (trimmed.length > restNameMaxLen) {
      throw new TypeError(errors.invalidRestaurantNameLength);
    }

    this._name = trimmed;
  }

  addDish(dish) {
    if (!(dish instanceof Dish)) {
      throw new TypeError(errors.invalidDish);
    }

    this.menu.push(dish);
  }

  removeDish(dishName) {
    this._menu = this._menu.filter((d) => d.name !== dishName);
  }
}
