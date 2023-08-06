const Player = require("../models/Player");

const teamSelection = async (req, res) => {
  const teamRequirements = req.body;
  const selectedPlayers = [];
  try {
    for (const requirement of teamRequirements) {
      const { position, mainSkill, numberOfPlayers } = requirement;

      // Validate position
      const validPositions = ["defender", "midfielder", "forward"];
      if (!validPositions.includes(position)) {
        return res.status(400).json({
          message: `Invalid value for position: ${position}`,
          field: "position",
        });
      }

      // Validate player skills
      const validSkills = ["defense", "attack", "speed", "strength", "stamina"];
      if (!validSkills.includes(mainSkill)) {
        return res.status(400).json({
          message: "At least one value is required for the player",
          field: "mainSkill",
        });
      }
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

      // If required number of players is not available
      if (filteredPlayers.length < numberOfPlayers) {
        return res.status(400).json({
          message: `Insufficient number of players for position: ${position}`,
        });
      }

      selectedPlayers.push(...filteredPlayers);
    }

    res.status(200).json({
      selectedPlayers,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during team selection:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

module.exports = {
  teamSelection,
};
