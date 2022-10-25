const path = require("path");
const { renderFile } = require("pug");
const { prepareImageURL } = require("../../helpers");

const getPugFilePath = filePath => path.join(process.cwd(), "src", "pug", ...filePath);
const pathToPugFile = ["includes", "blog", "seeAlso.pug"];

module.exports.renderSeeAlsoBlock = function({ code, title, announceImageUrl }, path) {
  const image = prepareImageURL(announceImageUrl.url);

  const content = renderFile(getPugFilePath(pathToPugFile), {
    url: `/${path}/${code}`,
    title: title,
    image,
  });

  return `<div style="position: relative">${content}</div>`;
};
