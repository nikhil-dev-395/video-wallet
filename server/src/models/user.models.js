const { default: mongoose } = require("mongoose");

/*
for better understanding
e.g.

username:nikhil_wankhade,
email:nikhilw395@gmail.com,
password:encrypted,
walletBalance: 10 - if we purchase a recharge ,
purchasedVideos: [video1 model]

*/

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //   here we are going to store balance in INR from google play recharge - remember this
    walletBalance: {
      type: Number,
      default: 0,
    },
    purchasedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
