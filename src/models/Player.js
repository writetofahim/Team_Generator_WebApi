const mongoose = require("mongoose");

// Define the schema for player skills
const playerSkillSchema = new mongoose.Schema({
  skill: {
    type: String,
    enum: ["defense", "attack", "speed", "strength", "stamina"],
    required: true,
  },
  value: { type: Number },
});

// Define the main player schema
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: {
    type: String,
    enum: ["defender", "midfielder", "forward"],
    required: true,
  },
  playerSkills: { type: [playerSkillSchema], required: true },
});

// Create the Player model based on the playerSchema
const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
