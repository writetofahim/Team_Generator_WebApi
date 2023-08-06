const mongoose = require("mongoose");
const app = require("./src/app");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Server address
const port = process.env.PORT || 3000;
const hostname = "localhost";

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
