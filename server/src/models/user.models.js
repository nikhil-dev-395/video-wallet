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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  //   here we are going to store balance in INR from google play - remember this
  walletBalance: {
    type: Number,
    required: false,
    default: 0,
  },
  purchasedVideos: {
    type: [String],
    required: false,
    default: [],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
