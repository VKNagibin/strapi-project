import { device } from "device.js";
import "jquery-bez";
import "lazysizes";

import "../css/errorPage.scss";

import menu from "./include/menu";
import modal from "./include/modal";
import forms from "./include/forms";
import detectOs from "./include/detectOs";

device.addClasses(document.documentElement);

document.addEventListener("DOMContentLoaded", function() {
  detectOs();
  modal();
  menu();
  forms();
});
