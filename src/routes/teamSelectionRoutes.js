const express = require("express");
const router = express.Router();
const { teamSelection } = require("../controllers/teamSelectionController.js");

router.post("/process", teamSelection);

module.exports = router;
