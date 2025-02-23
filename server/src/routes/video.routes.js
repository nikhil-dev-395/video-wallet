const router = require("express").Router();
const Video = require("../models/video.models");

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

module.exports = { VideoRouter: router };
