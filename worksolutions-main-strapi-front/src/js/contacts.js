import "jquery-bez";
import "lazysizes";

import forms from "./include/forms";
import detectOs from "./include/detectOs";
import menu from "./include/menu";
import generalAnimations from "./include/generalAnimations";
import modal from "./include/modal";
import map from "./include/map";

document.addEventListener("DOMContentLoaded", function() {
  detectOs();
  menu();
  generalAnimations();
  modal();
  map();
  forms();
});
