const router = require("express").Router();

router.create("/create-user", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/user-info", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
    });
  }
});

router.post("/recharge-wallet", (req, res) => {});

router.post("/purchase-video", (req, res) => {});

module.exports = { UserRouter: router };
