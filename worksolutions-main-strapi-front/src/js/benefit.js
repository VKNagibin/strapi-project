import "jquery-bez";
import "lazysizes";

import detectOs from "./include/detectOs";
import menu from "./include/menu";
import generalAnimations from "./include/generalAnimations";
import modal from "./include/modal";
import forms from "./include/forms";
import benefit from "./include/benefitPageHandle";

document.addEventListener("DOMContentLoaded", function() {
  detectOs();
  menu();
  generalAnimations();
  modal();
  forms();
  benefit();
});
