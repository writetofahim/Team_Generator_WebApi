const express = require("express");
const router = express.Router();
const {
  createPlayer,
  updatePlayer,
  deletePlayer,
  listOfPlayers,
} = require("../controllers/playerController");
const deleteAuth = require("../middlewares/deleteAuth");

router.post("/", createPlayer);
router.put("/:playerId", updatePlayer);
router.delete("/:playerId", deleteAuth, deletePlayer);
router.get("/", listOfPlayers);

module.exports = router;
