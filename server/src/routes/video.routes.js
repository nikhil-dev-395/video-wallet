const router = require("express").Router();
const Video = require("../src/models/video.models");

router.post("/create", async (req, res) => {
  try {
    const createVideo = await Video.create({
      videoLink:
        "https://res.cloudinary.com/dbenalctk/video/upload/v1740225099/video2_davdwy.mp4",
      videoTitle: "Mobile Phone View",
      price: 2,
      purchasedBy: "65d94c41b8a6f8d9a5c2a34e",
      uploadedBy: "65d94c41b8a6f8d9a5c2a34f",
    });

    return res.send(createVideo);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { VideoRouter: router };
