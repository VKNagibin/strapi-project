const { logError } = require("./blog/helpers");
const { teamPeople } = require("./team/frontTeam");

exports.frontOutstaffPageTeamHandler = async function(req, render) {
  try {
    return render({ teamPeople });
  } catch (e) {
    logError(e);
    return render({ teamPeople: [] });
  }
};
