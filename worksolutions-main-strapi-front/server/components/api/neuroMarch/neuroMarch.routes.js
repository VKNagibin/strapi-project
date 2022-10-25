const express = require("express");
const router = express.Router();
const apiController = require("./neuroMarch.controller");

router.post("/generate", apiController.generatePostcard);
router.get("/postcard/:id", apiController.getPostcard);
router.get("/proxy-postcard-image", apiController.getPostcardImage);

module.exports = router;
