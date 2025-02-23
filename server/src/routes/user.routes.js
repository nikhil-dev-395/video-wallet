const User = require("../models/user.models");

const router = require("express").Router();

// router.post("/create-user", async (req, res) => {
//   try {
//     const createUser = await User.create({
//       username: "nikhiil wankhade",
//       email: "nikhilw395@gmail.com",
//       password: "nikhiil",
//     });
//     return res.send(createUser);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// });

router.get("/user-info", async (req, res) => {
  try {
    // currently we are going to only use single` user`
    const SingleUser = await User.findOne();
    if (!SingleUser) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user found",
      user: SingleUser,
    });
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
