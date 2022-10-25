const { logError } = require("./blog/helpers");
const { teamPeople } = require("./team/index");

exports.indexPageTeamHandler = async function(req, render) {
  try {
    return render({ teamPeople });
  } catch (e) {
    logError(e);
    return render({ teamPeople: [] });
  }
};
