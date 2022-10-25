const { logError } = require("./blog/helpers");
const { teamPeople } = require("./team/backTeam");

exports.backOutstaffPageTeamHandler = async function(req, render) {
  try {
    return render({ teamPeople });
  } catch (e) {
    logError(e);
    return render({ teamPeople: [] });
  }
};
