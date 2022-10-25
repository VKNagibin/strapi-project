import "../css/receiptOcr.scss";
import "jquery-bez";
import "lazysizes";
import { device } from "device.js";

import detectOs from "./include/detectOs";
import menu from "./include/menu";
import modal from "./include/modal";
import forms from "./include/forms";
import { receiptOcr } from "./include/receiptOcr/mainReceiptOcr";

device.addClasses(document.documentElement);

document.addEventListener("DOMContentLoaded", function() {
  detectOs();
  modal();
  menu();
  forms();
  receiptOcr();
});
