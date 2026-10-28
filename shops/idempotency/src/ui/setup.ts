import { setupOffersConfetti } from "./effects";
import { setupSearchForm } from "./search/events";
import { setupTheme } from "./theme";

export function setupStaticUi(): void {
  setupTheme();
  setupSearchForm();
  setupOffersConfetti();
}
