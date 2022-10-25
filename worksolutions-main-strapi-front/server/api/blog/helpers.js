require("moment/locale/ru");
const axios = require("axios");
const AxiosLogger = require("axios-logger");
const DeviceDetector = require("node-device-detector");
const { format, parse } = require("date-fns");
const { ru } = require("date-fns/locale");

const axiosInstance = axios.create({
  baseURL: process.env.API_HOST,
});

const makeRequestName = req => req.method + " " + req.url;

AxiosLogger.setGlobalConfig({ dateFormat: "HH:MM:ss", status: true, headers: false, data: true });

axiosInstance.interceptors.request.use(req => {
  const name = makeRequestName(req);
  console.time(name);
  return AxiosLogger.requestLogger(req);
}, AxiosLogger.errorLogger);

axiosInstance.interceptors.response.use(
  res => {
    const name = makeRequestName(res.config);
    console.timeEnd(name);
    return AxiosLogger.responseLogger(res, { data: false });
  },
  err => {
    console.timeEnd(makeRequestName(err.config));
    return AxiosLogger.errorLogger(err);
  },
);

function logError(error) {
  if (error.isAxiosError) return;
  console.log(error);
}

function prepareImageURL(url) {
  if (process.env.RUNS_IN_VARIOUS_NETWORKS === "true") {
    return process.env.API_HOST + url;
  }
  return url;
}

function getImageWidth(userAgent, customSize) {
  const detector = new DeviceDetector();
  const result = detector.detect(userAgent);
  const deviceType = result ? result.device.type : null;
  const osType = result ? result.os.family : null;
  let imageWidth = 0;
  switch (deviceType) {
    case "smartphone":
      imageWidth = 400;
      break;
    case "tablet":
      imageWidth = 1100;
      break;
    case "desktop":
      imageWidth = customSize ? customSize : osType === "iOS" ? 1280 : 1015;
      break;
    default:
      imageWidth = 1100;
  }
  return imageWidth;
}

function resolveArticleUrl(pageLink, code) {
  if (pageLink) {
    let urlPath = urllib.parse(pageLink).pathname;
    return urlPath.endsWith("/") ? urlPath.slice(0, -1) : urlPath;
  }

  return "/blog/" + code;
}

function formatUnixDate(date) {
  const dateInstance = parse(date, "y-MM-dd", new Date());
  return format(dateInstance, "dd MMMM y", { locale: ru });
}

module.exports = {
  axiosInstance,
  logError,
  prepareImageURL,
  getImageWidth,
  resolveArticleUrl,
  formatUnixDate,
};