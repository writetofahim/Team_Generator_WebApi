const Player = require("../models/Player");

const teamSelection = async (req, res) => {
  const teamRequirements = req.body;
  const selectedPlayers = [];
  try {
    for (const requirement of teamRequirements) {
      const { position, mainSkill, numberOfPlayers } = requirement;
      let filteredPlayers = await Player.find({
        position: position,
        "playerSkills.skill": mainSkill,
      }).limit(numberOfPlayers);

      // If no players are found, get the highest skill value for the position
      if (filteredPlayers.length === 0) {
        filteredPlayers = await Player.find({ position: position })
          .sort({ "playerSkills.value": -1 })
          .limit(numberOfPlayers);
      }
      //   return res.status(200).json({
      //     filteredPlayers,
      //   });

      //   If required number of players is not available
      if (filteredPlayers.length < numberOfPlayers)
        return res.status(200).json({
          message: `Insufficient number of players for position: ${position}`,
        });
      selectedPlayers.push(...filteredPlayers);
    }
    res.status(200).json({
      selectedPlayers,
    });
    // console.log(selectedPlayers);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Check your connection and try again",
    });
  }
};

module.exports = {
  teamSelection,
};
