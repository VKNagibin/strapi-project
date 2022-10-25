const path = require("path");
const fs = require("fs");
const pug = require("pug");

const { getPugFileFullPath } = require("./utils");
const { axiosInstance } = require("../../api/blog/helpers");

const getHtmlFilePath = function(name) {
  return path.join(process.cwd(), "build", name);
};

function routeHandlers(req, dynamicPartsConfig) {
  return Promise.all(
    dynamicPartsConfig.map(({ renderFilePath, handler }) =>
      handler(req, options => pug.renderFile(getPugFileFullPath(renderFilePath), options)),
    ),
  );
}

function insertIntegrationAreas(htmlContent, integrationAreasData = { head: "", bodyStart: "", bodyEnd: "" }) {
  let result = htmlContent;

  result = result.replace("<noscript>{{headIntegrationArea}}</noscript>", integrationAreasData.head || "");
  result = result.replace("<noscript>{{bodyStartIntegrationArea}}</noscript>", integrationAreasData.bodyStart || "");
  result = result.replace("<noscript>{{bodyEndIntegrationArea}}</noscript>", integrationAreasData.bodyEnd || "");

  return result;
}

async function createRoute(req, res, htmlContent, dynamicPartsConfig, status) {
  let result = htmlContent;
  let integrationAreas;
  res.status(status);

  try {
    if (dynamicPartsConfig.length !== 0) {
      const routeData = await routeHandlers(req, dynamicPartsConfig);
      dynamicPartsConfig.forEach(({ template }, index) => {
        result = result.replace(template, routeData[index]);
      });
    }

    if (process.env.NODE_ENV === "production") {
      integrationAreas = await axiosInstance.get("/api/integration-areas");
    }
  } catch (e) {
    console.error("error", e);
    integrationAreas = { data: undefined };
  } finally {
    result = insertIntegrationAreas(result, integrationAreas?.data);
    res.send(result);
  }
}

module.exports.getHtmlFilePath = getHtmlFilePath;
module.exports.makeRoute = async function(
  app,
  routes,
  { fileName, pugFileHandler, dynamicPartsConfig = [], status = 200 },
) {
  if (pugFileHandler) {
    const pugFileFullPath = getPugFileFullPath(fileName);
    routes.forEach(route => {
      app.get(route, (req, res, next) => {
        pugFileHandler(
          req,
          res,
          options => {
            const htmlContent = pug.renderFile(pugFileFullPath, options);
            createRoute(req, res, htmlContent, [], status);
          },
          next,
        );
      });
    });
    return;
  }

  const htmlFilePath = getHtmlFilePath(fileName);
  const htmlContent = fs.readFileSync(htmlFilePath, "UTF-8");
  routes.forEach(route => {
    app.get(route, (req, res) => {
      createRoute(req, res, htmlContent, dynamicPartsConfig, status);
    });
  });
};
