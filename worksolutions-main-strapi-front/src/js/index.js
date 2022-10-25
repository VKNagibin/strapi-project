import "jquery-bez";
import "dragscroll";
import "slick-carousel";
import "lazysizes";
import { device } from "device.js";
import preload from "./preload";
import "../css/main.scss";

import detectOs from "./include/detectOs";
import menu from "./include/menu";
import map from "./include/map";
import generalAnimations from "./include/generalAnimations";
import difference from "./include/difference";
import modal from "./include/modal";
import forms from "./include/forms";
import experience from "./include/experience";
import first from "./include/first";
import teamSlider from "./include/teamSlider";
import reviewsSlider from "./include/reviewsSlider";
import blogInIndex from "./include/blogInIndex";
import setLocationForHiddenInputs from "./include/forms/setLocationForHiddenInputs";

preload();

device.addClasses(document.documentElement);

document.addEventListener("DOMContentLoaded", function() {
  detectOs();
  first();
  menu();
  map();
  generalAnimations();
  modal();
  forms();
  difference();
  experience();
  teamSlider();
  blogInIndex();
  reviewsSlider();
  setLocationForHiddenInputs();
});