const express = require("express");
const app = express();
const cors = require("cors");
const playerRoutes = require("./routes/playerRoutes");
const teamSelectionRoutes = require("./routes/teamSelectionRoutes");

// Enable CORS for all routes
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());

//If specified route
app.use("/api/player", playerRoutes);
app.use("/api/team", teamSelectionRoutes);

//If home or root route
app.get("/", (req, res) => {
  res.send("<h1>This is root route.</h1>");
});

//If Unknown route
app.use((req, res) => {
  res.send("<h1>404 Not Found!</h1>");
});

module.exports = app;
