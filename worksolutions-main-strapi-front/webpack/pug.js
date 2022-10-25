const path = require("path");
const pug = require("pug");
const fs = require("fs");
const chokidar = require("chokidar");

const isDev = require("./isDev");

const PATH = {
  src: path.join(__dirname, "../src"),
  build: path.join(__dirname, "..", "build"),
};

const watcher = chokidar.watch(PATH.build, {
  ignoreInitial: true,
  useFsEvents: false,
  persistent: false,
  usePolling: false,
});

const createFile = (fileName, content) => {
  fs.writeFileSync(`${PATH.build}/${fileName}.html`, content);
};

function compilePugFile(fileNameToRead, fileNameToWrite) {
  const filePath = `${PATH.src}/pug/${fileNameToRead}.pug`;
  const compiledFile = pug.renderFile(filePath);

  createFile(fileNameToWrite, compiledFile);

  if (isDev) {
    const watcher = chokidar.watch(filePath, {
      // TODO: смотреть за всей папкой а не за файлом
      ignoreInitial: true,
    });
    watcher.on("change", path => {
      console.log("rebuild", path);
      createFile(fileNameToWrite, pug.renderFile(filePath));
    });
  }
}

module.exports = {
  compileFilesCallback: () => {},
};

const addDirListener = () => {
  compilePugFile("index", "index");
  compilePugFile("contacts", "contacts");
  compilePugFile("404", "404");
  compilePugFile("includes/benefit/feedbackForm", "feedbackForm");
  compilePugFile("outstaffing-backend", "outstaffing-backend");
  compilePugFile("outstaffing-frontend", "outstaffing-frontend");
  compilePugFile("outstaffing-react", "outstaffing-react");
  compilePugFile("outstaffing-laravel", "outstaffing-laravel");
  compilePugFile("outstaffing-php", "outstaffing-php");
  compilePugFile("outstaffing-python", "outstaffing-python");
  compilePugFile("outstaffing-vue", "outstaffing-vue");
  compilePugFile("outstaffing-symfony", "outstaffing-symfony");
  compilePugFile("outstaffing-yii", "outstaffing-yii");
  compilePugFile("outstaffing-django", "outstaffing-django");
  compilePugFile("outstaffing-java", "outstaffing-java");
  compilePugFile("outstaffing-nodejs", "outstaffing-nodejs");
  compilePugFile("outstaffing-flutter", "outstaffing-flutter");
  compilePugFile("outstaffing-devops", "outstaffing-devops");
  compilePugFile("outstaffing-angular", "outstaffing-angular");
  compilePugFile("outstaffing-strapi", "outstaffing-strapi");
  compilePugFile("outstaffing-strapi", "outstaffing-strapi");
  compilePugFile("neuroMarch/neuro-march", "neuro-march");
  compilePugFile("neuroMarch/neuro-march-unique", "neuro-march-unique");
  compilePugFile("receipt-ocr", "receipt-ocr");
  compilePugFile("tehnicheskiy-audit-frontend", "tehnicheskiy-audit-frontend");
  compilePugFile("tehnicheskiy-audit-backend", "tehnicheskiy-audit-backend");

  watcher.close();
  module.exports.compileFilesCallback();
};

watcher.on("addDir", addDirListener);
