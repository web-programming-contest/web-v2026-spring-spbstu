"use strict";

export const priceMaxLen = 100000;
export const restNameMaxLen = 30;
export const dishNameMaxLen = 30;

export function validateDishModal() {
  const nameInput = document.getElementById("modalDishName");
  const priceInput = document.getElementById("modalDishPrice");
  const submitBtn = document.getElementById("modalDishSubmit");

  if (!nameInput || !priceInput || !submitBtn) return;

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  let isValid = true;

  if (name === "" || name.length > dishNameMaxLen) isValid = false;

  if (isNaN(price) || price < 1 || price > priceMaxLen) isValid = false;

  submitBtn.disabled = !isValid;
}

export function validateRestaurantModal() {
  const input = document.getElementById("modalRestaurantName");
  const submitBtn = document.getElementById("modalRestaurantSubmit");

  if (!input || !submitBtn) return;

  const name = input.value.trim();
  submitBtn.disabled = !(name.length > 0 && name.length <= restNameMaxLen);
}
