const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema(
  {
    videoLink: {
      type: String,
      required: true,
    },
    videoTitle: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      default: 1,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    //   here we are going to show who purchase this
    purchasedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    ],
    //   here we are going show . who is the owner of this video
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
