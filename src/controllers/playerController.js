const Player = require("../models/Player");

//Create player
const createPlayer = async (req, res) => {
  try {
    const { name, position, playerSkills } = req.body;
    const newPlayer = new Player({
      name,
      position,
      playerSkills,
    });

    // Validate position
    const validPositions = ["defender", "midfielder", "forward"];
    if (!validPositions.includes(position)) {
      return res
        .status(400)
        .json({ message: `Invalid value for position: ${position}` });
    }

    // Validate player skills
    const validSkills = ["defense", "attack", "speed", "strength", "stamina"];
    if (!Array.isArray(playerSkills) || playerSkills.length === 0) {
      return res.status(400).json({
        message: `At least one value is required for the player`,
      });
    }
    for (const skill of playerSkills) {
      if (!validSkills.includes(skill.skill)) {
        return res
          .status(400)
          .json({ message: `Invalid value for skill: ${skill.skill}` });
      }
    }

    await newPlayer.save();
    res.status(201).json({
      success: true,
      newPlayer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Check your connection and try again",
    });
  }
};
//Update player
const updatePlayer = async (req, res) => {
  try {
    const { playerId } = req.params;
    const { name, position, playerSkills } = req.body;

    // Validate position
    const validPositions = ["defender", "midfielder", "forward"];
    if (!validPositions.includes(position)) {
      return res
        .status(400)
        .json({ message: `Invalid value for position: ${position}` });
    }

    // Validate player skills
    const validSkills = ["defense", "attack", "speed", "strength", "stamina"];
    for (const skill of playerSkills) {
      if (!validSkills.includes(skill.skill)) {
        return res
          .status(400)
          .json({ message: `Invalid value for skill: ${skill.skill}` });
      }
    }
    // Find the player by ID and update its data
    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      { name, position, playerSkills },
      {
        new: true, // Return the updated player instead of the original one
      }
    );

    // If the player is not found, return 404 status
    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found." });
    }

    res.status(200).json({
      message: "Player updated successfully",
      updatedPlayer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Check your connection and try again",
      error: error.message,
    });
  }
};
// Delete Player
const deletePlayer = async (req, res) => {
  const { playerId } = req.params;
  try {
    const player = await Player.findByIdAndDelete(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found." });
    }

    res.status(200).json({
      message: "Player deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Check your connection and try again",
      error: error.message,
    });
  }
};
// List of All players
const listOfPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    return res.status(200).json({
      success: true,
      players,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Check your connection and try again",
    });
  }
};

module.exports = {
  createPlayer,
  updatePlayer,
  deletePlayer,
  listOfPlayers,
};
