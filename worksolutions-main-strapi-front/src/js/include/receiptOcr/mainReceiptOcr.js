import { setBackgroundImage } from "./handlers/setBackgroundImage";
import { addInputChangeListener, addSelectFileButtonClickListener } from "./handlers/selectFileBlock";
import { addSearchInputChangeListener, addSearchListeners, disableSearchButtons } from "./handlers/searchInput";
import { renderPreviewImages, selectFirstImage, setPresets } from "./handlers/previewImages";
import { defineBlocksSize, defineViewMode } from "./handlers/resize";
import { endInitialize, setInitialView } from "./handlers/initialize";
import { setDataForOtherDemoCard } from "./handlers/otherDemo";
import { setScrollbar } from "./handlers/setScrollbar";

export function receiptOcr() {
  setBackgroundImage();
  setScrollbar();
  addSelectFileButtonClickListener();
  addInputChangeListener();
  disableSearchButtons();
  addSearchInputChangeListener();
  addSearchListeners();
  setPresets();
  renderPreviewImages();
  selectFirstImage();
  defineViewMode();
  defineBlocksSize();
  setInitialView();
  setDataForOtherDemoCard();
  endInitialize();
}
