const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
  },
  videoTitle: {
    type: String,
    required: true,
  },
  //   here we are going to show who purchase this
  purchaseBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  //   here we are going show . who is the owner of this video
  uploadBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
