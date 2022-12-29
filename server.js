const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, "./tasks/build")));

const userrouter = require("./routing/userrouter");
app.use("/api/", userrouter);

const taskrouter = require("./routing/taskrouter");
app.use("/api/", taskrouter);

const profilerouter = require("./routing/profilerouter");
app.use("/api/", profilerouter);

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./tasks/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const connectDB = require("./config/db");
connectDB();
app.listen(PORT, (err) => {
  if (err) throw err;
  else {
    console.log("Server runs on " + PORT);
  }
});
