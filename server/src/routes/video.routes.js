const router = require("express").Router();
const Video = require("../models/video.models");
const User = require("../models/user.models.js");
router.post("/create", async (req, res) => {
  try {
    const createVideo = await Video.create({
      videoLink:
        "https://res.cloudinary.com/dbenalctk/video/upload/v1740225099/video2_davdwy.mp4",
      videoTitle: "Mobile Phone View",
      price: 2,
      uploadedBy: "67bac4f8602931a307c60a9d",
    });

    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      data: createVideo,
    });
  } catch (error) {
    console.error("Error creating video:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

router.get("/show-all-video", async (req, res) => {
  try {
    const allVideo = await Video.find();
    if (allVideo.length === 0) {
      return res.status(200).json({
        success: false,
        message: "no video uploaded yet",
      });
    }
    return res.status(200).json({
      success: true,
      allVideo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/buy-video", async (req, res) => {
  try {
    const { videoId } = req.body;
    if (!videoId) {
      return res
        .status(400)
        .json({ success: false, message: "Video ID is required" });
    }

    const videoToBuy = await Video.findById(videoId);
    if (!videoToBuy) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const existUser = await User.findOne();
    if (!existUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (existUser.walletBalance < videoToBuy.price) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't have enough balance" });
    }

    // Deduct the price from the wallet balance
    existUser.walletBalance -= videoToBuy.price;
    // Update the video document: push user ID to purchasedBy array
    const userId = existUser._id;
    if (!videoToBuy.purchasedBy.includes(userId)) {
      videoToBuy.purchasedBy.push(userId);
      await videoToBuy.save();
    }

    existUser.purchasedVideos.push(videoId);
    await existUser.save();

    return res.status(200).json({
      success: true,
      message: "Video purchased successfully",
      purchasedBy: videoToBuy.purchasedBy,
    });
  } catch (error) {
    console.error("Error at buying video:", error);
    return res.status(500).json({
      success: false,
      message: "Error at buying video",
      error: error.message,
    });
  }
});

module.exports = { VideoRouter: router };
