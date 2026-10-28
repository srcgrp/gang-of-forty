import { setupOffersConfetti } from "../../../shared/ui/effects";
import { setupSearchForm } from "./search/events";
import { setupTheme } from "../../../shared/ui/theme";
export function setupStaticUi(): void {
  setupTheme();
  setupSearchForm();
  setupOffersConfetti();
}
