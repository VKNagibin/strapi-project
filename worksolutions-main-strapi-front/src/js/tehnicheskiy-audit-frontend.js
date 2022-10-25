import "../css/tehnicheskiy-audit-frontend.scss";

import "jquery-bez";
import "dragscroll";
import "slick-carousel";
import "lazysizes";

import forms from "./include/forms";
import detectOs from "./include/detectOs";
import menu from "./include/menu";
import generalAnimations from "./include/generalAnimations";
import modal from "./include/modal";
import reviewsSlider from "./include/reviewsSlider";

import { device } from "device.js";

device.addClasses(document.documentElement);

document.addEventListener("DOMContentLoaded", function() {
    detectOs();
    menu();
    generalAnimations();
    modal();
    forms();
    reviewsSlider();
});
