const { logError } = require("../../../api/blog/helpers");
const { removeAllSpaces } = require("../../../util/helper");
const { readImageBase64FromStream } = require("../../files/readImageBase64FromStream");
const { axiosInstance } = require("../../../api/blog/helpers");

const baseEightMarchUrl = "/api/eight-march";
const headers = { "Content-Type": "application/json" };

exports.generatePostcard = async function(req, res) {
  try {
    const { name } = req.query;
    const { data: response } = await axiosInstance.post(encodeURI(`${baseEightMarchUrl}/generate?name=${name}`), {
      headers,
    });
    res.json(response.data);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так" });
    logError(e);
  }
};

exports.getPostcard = async function(req, res) {
  const { id } = req.params;
  try {
    const { data: response } = await axiosInstance.get(encodeURI(`${baseEightMarchUrl}/postcard/${id}`), {
      headers,
    });
    res.json(response.data);
  } catch (e) {
    res.status(404).json({ message: "Открытка по данному ключу не найдена" });
    logError(e);
  }
};

exports.proxyPostcardImage = async function(req, res) {
  const { imageUrl } = req.query;

  const { data: response } = await axiosInstance.get(removeAllSpaces(imageUrl), { responseType: "stream" });
  const imageBase64 = await readImageBase64FromStream(response, response.headers["content-type"]);
  res.send(imageBase64);
};
