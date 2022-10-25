import axios from "axios";
const BASE_URL = process.env.NODE_ENV === "development" ? "http://worksolutions.ws-dev.ru" : "";

const imageApi = {
  getReceipt: id => {
    return axios.get(`${BASE_URL}/api/receipt-ocr/recognition/${id}`, {});
  },
  uploadReceipt: image => {
    const formData = new FormData();
    formData.append("image", image);
    return axios.post(`${BASE_URL}/api/receipt-ocr/recognition`, formData, {
      "Content-Type": "multipart/form-data",
    });
  },
  uploadByUrl: url => {
    return axios.post(`${BASE_URL}/api/receipt-ocr/recognition/by-url`, { url });
  },
};

export default imageApi;
