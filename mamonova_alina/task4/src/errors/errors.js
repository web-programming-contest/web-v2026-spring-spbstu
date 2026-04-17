"use strict";

export const errors = {
  invalidDishName: "Название блюда должно быть строкой",
  invalidDishPrice: "Цена блюда должна быть положительным числом",
  invalidDishPriceMin: "Цена не должна быть меньше заданного значения",
  invalidDishPriceMax: "Цена не должна быть больше заданного значения",
  invalidPrice: "Неверно введена цена",
  emptyDishName: "Название блюда обязательно",
  invalidDish: "Dish должен быть экземпляром Dish",

  emptyRestaurantName: "Название не может быть пустым",
  existedRestaurantName: "Ресторан с таким названием уже существует",
  restaurantNotFound: "Ресторан не найден",

  invalidDishNameLength:
    "Название блюда не должно превышать заданное количество символов",
  invalidRestaurantNameLength:
    "Название ресторана не должно превышать заданное количество символов",
};
