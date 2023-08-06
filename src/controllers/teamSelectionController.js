const Player = require("../models/Player");

const teamSelection = (req, res) => {
  const teamRequirements = req.body;
  console.log(teamRequirements);
};

module.exports = {
  teamSelection,
};
