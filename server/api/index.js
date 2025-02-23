require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
// files
const connectDB = require("../src/db/connect.db");
const { UserRouter } = require("../src/routes/user.routes");
const { VideoRouter } = require("../src/routes/video.routes");
const { paymentRouter } = require("../src/routes/payment.routes");
// config
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewares
const api_version = "/api/v1";
app.use(`${api_version}/user`, UserRouter);
app.use(`${api_version}/video`, VideoRouter);
app.use(`${api_version}/payment`, paymentRouter);

// sending a api key to frontend

app.get(`${api_version}/getApiKey`, async (req, res) => {
  return res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

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
