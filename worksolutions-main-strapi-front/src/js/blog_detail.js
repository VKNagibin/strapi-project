import "jquery-bez";
import "lazysizes";
import "prismjs/themes/prism.css";

import "../css/blog_detail.scss";

import detectOs from "./include/detectOs";
import menu from "./include/menu";
import generalAnimations from "./include/generalAnimations";
import modal from "./include/modal";
import forms from "./include/forms";
import common from "./include/common-blog";
import setLocationForHiddenInputs from "./include/forms/setLocationForHiddenInputs";
import blogPageCodeFormat from "./include/prism/blogPageCodeFormat";
import blogCopyUrl from "./include/blogCopyUrl";

document.addEventListener("DOMContentLoaded", function() {
  detectOs();
  menu();
  generalAnimations();
  modal();
  forms();
  common();
  setLocationForHiddenInputs();
  blogPageCodeFormat();
  blogCopyUrl();
});
