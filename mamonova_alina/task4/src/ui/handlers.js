import { fakeAsync } from "../services/async.js";
import {
  addRestaurantSync,
  removeRestaurantSync,
  addDishToRestaurantSync,
  removeDishFromRestaurantSync,
  getRestaurantsContainingDish,
} from "../services/restaurantService.js";
import { renderCards, renderAnalytics, updateSearchResult } from "./render.js";
import { validateDishModal, validateRestaurantModal } from "./validation.js";

let searchInputElement = null;
let currentRestaurantIndexForDish = null;

function openRestaurantModal() {
  const modal = document.getElementById("restaurantModal");
  const input = document.getElementById("modalRestaurantName");
  const submitBtn = document.getElementById("modalRestaurantSubmit");

  if (!modal || !input || !submitBtn) return;

  input.value = "";
  submitBtn.disabled = true;
  modal.style.display = "flex";

  input.focus();
}

function closeRestaurantModal() {
  const modal = document.getElementById("restaurantModal");
  if (modal) modal.style.display = "none";
}

async function handleAddRestaurantFromModal() {
  const input = document.getElementById("modalRestaurantName");
  const submitBtn = document.getElementById("modalRestaurantSubmit");

  if (!input || submitBtn.disabled) return;

  const name = input.value.trim();
  try {
    await fakeAsync(() => addRestaurantSync(name));
    closeRestaurantModal();
    await fullUpdate();
  } catch (err) {
    console.error(err);
  }
}

function openDishModal(restIndex) {
  const modal = document.getElementById("dishModal");
  const nameInput = document.getElementById("modalDishName");
  const priceInput = document.getElementById("modalDishPrice");
  const submitBtn = document.getElementById("modalDishSubmit");

  if (!modal || !nameInput || !priceInput || !submitBtn) return;

  currentRestaurantIndexForDish = restIndex;

  nameInput.value = "";
  priceInput.value = "";
  submitBtn.disabled = true;
  modal.style.display = "flex";

  nameInput.focus();
}

function closeDishModal() {
  const modal = document.getElementById("dishModal");
  if (modal) modal.style.display = "none";
  currentRestaurantIndexForDish = null;
}

async function handleAddDishFromModal() {
  const nameInput = document.getElementById("modalDishName");
  const priceInput = document.getElementById("modalDishPrice");
  const submitBtn = document.getElementById("modalDishSubmit");

  if (!nameInput || !priceInput || submitBtn.disabled) return;

  if (currentRestaurantIndexForDish === null) return;

  const dishName = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  try {
    await fakeAsync(() =>
      addDishToRestaurantSync(currentRestaurantIndexForDish, dishName, price),
    );
    closeDishModal();
    await fullUpdate();
  } catch (err) {
    console.error(err);
  }
}

export function setupEventDelegation() {
  document.addEventListener("click", async (e) => {
    const removeDishBtn = e.target.closest(".remove-dish-btn");
    if (removeDishBtn) {
      const restIndex = parseInt(removeDishBtn.dataset.restIndex);
      const dishName = removeDishBtn.dataset.dishName;
      try {
        await fakeAsync(() =>
          removeDishFromRestaurantSync(restIndex, dishName),
        );
        await fullUpdate();
      } catch (err) {
        console.error(err);
      }
      return;
    }

    const delRestBtn = e.target.closest(".delete-rest-btn");
    if (delRestBtn) {
      const restIndex = parseInt(delRestBtn.dataset.restIndex);
      try {
        await fakeAsync(() => removeRestaurantSync(restIndex));
        await fullUpdate();
      } catch (err) {
        console.error(err);
      }
      return;
    }

    const openDishBtn = e.target.closest(".open-dish-modal-btn");
    if (openDishBtn) {
      const restIndex = parseInt(openDishBtn.dataset.restIndex);
      openDishModal(restIndex);
    }
  });

  const openRestModalBtn = document.getElementById("openRestaurantModalBtn");
  if (openRestModalBtn)
    openRestModalBtn.addEventListener("click", openRestaurantModal);

  const closeRestaurant = document.getElementById("modalRestaurantCancel");
  const closeRestaurantX = document.querySelector(
    "#restaurantModal .modal-close",
  );
  if (closeRestaurant)
    closeRestaurant.addEventListener("click", closeRestaurantModal);

  if (closeRestaurantX)
    closeRestaurantX.addEventListener("click", closeRestaurantModal);

  const closeDish = document.getElementById("modalDishCancel");
  const closeDishX = document.querySelector("#dishModal .modal-close");
  if (closeDish) closeDish.addEventListener("click", closeDishModal);
  if (closeDishX) closeDishX.addEventListener("click", closeDishModal);

  const restNameInput = document.getElementById("modalRestaurantName");
  const restaurantForm = document.getElementById("restaurantForm");
  if (restNameInput)
    restNameInput.addEventListener("input", validateRestaurantModal);

  if (restaurantForm)
    restaurantForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await handleAddRestaurantFromModal();
    });

  const dishNameField = document.getElementById("modalDishName");
  const dishPriceField = document.getElementById("modalDishPrice");
  const dishForm = document.getElementById("dishForm");
  if (dishNameField) dishNameField.addEventListener("input", validateDishModal);

  if (dishPriceField)
    dishPriceField.addEventListener("input", validateDishModal);

  if (dishForm)
    dishForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await handleAddDishFromModal();
    });

  window.addEventListener("click", (e) => {
    const restModal = document.getElementById("restaurantModal");
    const dishModalElem = document.getElementById("dishModal");
    if (e.target === restModal) closeRestaurantModal();
    if (e.target === dishModalElem) closeDishModal();
  });

  const searchBtn = document.getElementById("searchDishBtn");
  searchInputElement = document.getElementById("searchDishInput");
  if (searchBtn && searchInputElement) {
    const performSearch = () => {
      const query = searchInputElement.value;
      const matched = getRestaurantsContainingDish(query);
      updateSearchResult(query, matched);
    };
    searchBtn.addEventListener("click", performSearch);
    searchInputElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performSearch();
    });
  }
}

async function fullUpdate() {
  renderCards();
  renderAnalytics();

  if (searchInputElement && searchInputElement.value.trim()) {
    const matched = getRestaurantsContainingDish(searchInputElement.value);
    updateSearchResult(searchInputElement.value, matched);
  } else {
    updateSearchResult("", []);
  }
}
