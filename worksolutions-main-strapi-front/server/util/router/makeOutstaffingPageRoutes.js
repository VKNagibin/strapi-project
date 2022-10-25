const { makeRoute } = require("../../util/router/makeRoute");

function getOutstaffingPageRouteConfig(pageDescription) {
    const { techName, teamSectionConfig } = pageDescription;

    const routeConfig = {
        routes: [`/outstaffing-${techName}/`, `outstaffing-${techName}.html`],
        fileName: `outstaffing-${techName}.html`,
        dynamicPartsConfig: [],
    }

    if (teamSectionConfig) {
        const { pugFilePath, handler } = teamSectionConfig;
        routeConfig.dynamicPartsConfig.push({
            template: "<p>{{team_template}}</p>",
            renderFilePath: pugFilePath,
            handler,
        });
    }

    return routeConfig;
}

exports.makeOutstaffingPageRoutes = (app, pageDescriptions) => {
    for (const pageDescription of pageDescriptions) {
        const routeConfig = getOutstaffingPageRouteConfig(pageDescription);
        const { routes, fileName, dynamicPartsConfig } = routeConfig;
        makeRoute(app, routes, { fileName, dynamicPartsConfig });
    }
}