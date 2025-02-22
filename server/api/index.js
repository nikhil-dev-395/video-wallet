require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// files
const connectDB = require("../src/db/connect.db");
// config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// middlewares

// server start
const PORT = process.env.PORT;
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("server is listening on http://localhost:" + PORT);
    });
  } catch (error) {
    console.log("error occurred at server" + error);
  }
})();

/*
 we are exporting this because of our vercel config , its just for deployment nothing
special */
module.exports = app;
