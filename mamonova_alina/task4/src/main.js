import { load } from "./store/store.js";
import { renderCards, renderAnalytics } from "./ui/render.js";
import { setupEventDelegation } from "./ui/handlers.js";

function init() {
  load();
  renderCards();
  renderAnalytics();
  setupEventDelegation();
}

init();
