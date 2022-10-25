const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const robots = require("express-robots-txt");
const expressStaticGzip = require("express-static-gzip");

require("dotenv").config();

const neuroMarchRoutes = require("./components/api/neuroMarch/neuroMarch.routes");

const {
  blogPageHandler,
  blogPageApiHandler,
  benefitPageHandler,
  benefitPageApiHandler,
} = require("./api/blog/articlesList.js");

const { blogDetailHandler, benefitDetailHandler } = require("./api/blog/detailArticle");
const { indexPageTeamHandler } = require("./api/indexPage.js");
const { backOutstaffPageTeamHandler } = require("./api/backOutstaff");
const { frontOutstaffPageTeamHandler } = require("./api/frontOutstaff");

const { makeRoute } = require("./util/router/makeRoute");
const { makeOutstaffingPageRoutes } = require("./util/router/makeOutstaffingPageRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/eight-march", neuroMarchRoutes);

makeRoute(app, ["/", "/index.html"], {
  fileName: "index.html",
  dynamicPartsConfig: [
    { template: "<p>{{team_template}}</p>", renderFilePath: "includes/team/team.pug", handler: indexPageTeamHandler },
  ],
});

makeRoute(app, ["/tehnicheskiy-audit-frontend", "/tehnicheskiy-audit-frontend.html"], { fileName: "tehnicheskiy-audit-frontend.html" });
makeRoute(app, ["/tehnicheskiy-audit-backend", "/tehnicheskiy-audit-backend.html"], { fileName: "tehnicheskiy-audit-backend.html" });
makeRoute(app, ["/contacts", "/contacts.html"], { fileName: "contacts.html" });
makeRoute(app, ["/blog/", "/blog/section-:categories", "/blog.html"], {
  fileName: "blog.pug",
  pugFileHandler: blogPageHandler,
});

makeOutstaffingPageRoutes(app, [
  {
    techName: "backend",
    teamSectionConfig: {
      pugFilePath: "/includes/team/backTeam.pug",
      handler: backOutstaffPageTeamHandler,
    },
  },
  {
    techName: "frontend",
    teamSectionConfig: {
      pugFilePath: "/includes/team/frontTeam.pug",
      handler: frontOutstaffPageTeamHandler,
    },
  },
  {
    techName: "php",
    teamSectionConfig: {
      pugFilePath: "/includes/team/phpTeam.pug",
      handler: backOutstaffPageTeamHandler,
    },
  },
  {
    techName: "laravel",
    teamSectionConfig: {
      pugFilePath: "/includes/team/laravelTeam.pug",
      handler: backOutstaffPageTeamHandler,
    },
  },
  {
    techName: "react",
    teamSectionConfig: {
      pugFilePath: "/includes/team/reactTeam.pug",
      handler: frontOutstaffPageTeamHandler,
    },
  },
  { techName: "python" },
  { techName: "vue" },
  { techName: "symfony" },
  { techName: "yii" },
  { techName: "django" },
  { techName: "java" },
  { techName: "nodejs" },
  { techName: "flutter" },
  { techName: "devops" },
  { techName: "angular" },
  { techName: "strapi" },
]);

makeRoute(app, ["/neuro-march/", "neuro-march.html"], {
  fileName: "neuro-march.html",
});

makeRoute(app, ["/neuro-march/:code", "neuro-march-unique.html"], {
  fileName: "neuro-march-unique.html",
});

makeRoute(app, ["/useful/", "/useful.html"], { fileName: "benefit.pug", pugFileHandler: benefitPageHandler });
makeRoute(app, ["/blog/demo-recognition-receipts/", "/blog/demo-recognition-receipts.html"], {
  fileName: "receipt-ocr.html",
});
makeRoute(app, ["/blog/:code"], { fileName: "blog-detail.pug", pugFileHandler: blogDetailHandler });
makeRoute(app, ["/useful/:code"], { fileName: "benefit-detail.pug", pugFileHandler: benefitDetailHandler });
app.use("/blog-api", blogPageApiHandler);
app.use("/useful-api", benefitPageApiHandler);

function getMaxAge(hours) {
  return 1000 * 60 * 60 * hours;
}

const staticOptions = {
  indexFromEmptyFile: false,
  enableBrotli: false,
  orderPreference: ["gz"],
};

if (process.env.NODE_ENV === "production") {
  staticOptions.serveStatic = { maxAge: getMaxAge(4), immutable: true };
}

app.use(expressStaticGzip(path.join(__dirname, "../", "build"), staticOptions));

app.use(robots(path.join(__dirname, "../", "robots.txt")));

makeRoute(app, ["*"], { fileName: "404.html", status: 404 });

const port = process.env.PORT || 3000;

app.listen(port, "127.0.0.1", () => {
  console.log("Start server at", `http://localhost:${port}`);
});
