exports.readImageBase64FromStream = async function(stream, contentType) {
  return new Promise((resolve, reject) => {
    try {
      let body = `data:${contentType};base64,`;

      stream.setEncoding("base64");
      stream.on("data", data => {
        body += data;
      });

      stream.on("end", () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
};
