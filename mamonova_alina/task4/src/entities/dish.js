import { errors } from "../errors/errors.js";
import { dishNameMaxLen, priceMaxLen } from "../ui/validation.js";

export class Dish {
  constructor(name, price) {
    this._name = name;
    this._price = price;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  set name(value) {
    if (typeof value !== "string" || !value.trim()) {
      throw new TypeError(errors.invalidDishName);
    }

    const trimmed = value.trim();
    if (trimmed.length > dishNameMaxLen) {
      throw new TypeError(errors.invalidDishNameLength);
    }

    this._name = trimmed;
  }

  set price(value) {
    if (typeof value !== "number" || isNaN(value)) {
      throw new TypeError(errors.invalidDishPrice);
    }

    if (value < 1) {
      throw new TypeError(errors.invalidDishPriceMin);
    }

    if (value > priceMaxLen) {
      throw new TypeError(errors.invalidDishPriceMax);
    }
  }
}
