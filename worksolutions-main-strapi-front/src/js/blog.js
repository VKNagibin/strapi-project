import "jquery-bez";
import "lazysizes";

import "../css/blog.scss";

import detectOs from "./include/detectOs";
import menu from "./include/menu";
import generalAnimations from "./include/generalAnimations";
import modal from "./include/modal";
import forms from "./include/forms";
import common from "./include/common-blog";

document.addEventListener("DOMContentLoaded", function() {
  detectOs();
  menu();
  generalAnimations();
  modal();
  forms();
  common();
});
