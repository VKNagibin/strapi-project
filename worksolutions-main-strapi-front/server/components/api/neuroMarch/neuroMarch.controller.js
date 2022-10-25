const apiService = require("./neuroMarch.service");
const { controllerErrorCallbackFactory } = require("../../../decorators/controllerErrorCallbackFactory");

exports.generatePostcard = (req, res) => {
  apiService.generatePostcard(req, res);
};

exports.getPostcard = (req, res) => {
  apiService.getPostcard(req, res);
};

withDefaultImageOnError = function(callback) {
  function catchCallback(_, res) {
    res.send("/i/neuroMarch/default-postcard-image.jpg");
  }
  return controllerErrorCallbackFactory(callback, catchCallback);
};

exports.getPostcardImage = withDefaultImageOnError(apiService.proxyPostcardImage);
