const { logError } = require("../api/blog/helpers");
exports.controllerErrorCallbackFactory = function(callback, catchCallback) {
  return (req, res) => {
    try {
      callback(req, res);
    } catch (e) {
      logError(e);
      catchCallback(req, res);
    }
  };
};
