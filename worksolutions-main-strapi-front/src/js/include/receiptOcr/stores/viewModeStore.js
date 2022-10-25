import { renderCurrentViewMode } from "../handlers/defineViewMode";
import { renderResults } from "../handlers/renderResults";

class ViewModeStore {
  constructor() {
    this.tabMode = "result";
    this.viewMode = "split";
  }

  setTabMode(tabMode) {
    if (this.tabMode === tabMode) return;
    this.tabMode = tabMode;
    renderResults();
  }

  setViewMode(viewMode) {
    if (this.viewMode === viewMode) return;

    this.viewMode = viewMode;
    renderCurrentViewMode();
  }
}

export default new ViewModeStore();
