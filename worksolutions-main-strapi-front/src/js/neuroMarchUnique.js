import "../css/neuroMarchUnique.scss";

import "jquery-bez";
import "lazysizes";

import { device } from "device.js";

import detectOs from "./include/detectOs";
import menu from "./include/menu";
import yaShare from "./include/yaShare/yaShare";
import addCopyIconShare from "./include/yaShare/addCopyIconShare";
import loadPostCard from "./include/neuroMarch/loadPostCard";
import requestToGetPostCard from "./include/neuroMarch/requestToGetPostCard";
import modal from "./include/modal";
import forms from "./include/forms";

device.addClasses(document.documentElement);

document.addEventListener("DOMContentLoaded", function() {
  detectOs();
  modal();
  menu();
  forms();
  loadPostCard();
  requestToGetPostCard();
  yaShare(() => {
    addCopyIconShare();
  });
});
