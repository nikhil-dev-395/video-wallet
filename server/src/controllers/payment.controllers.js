const instance = require("../config/instance.config.js");
const crypto = require("crypto");
const User = require("../models/user.models.js");
const checkout = async (req, res) => {
  try {
    const paymentLink = await instance.paymentLink.create({
      amount: req.body.amount * 10,
      // Ensure amount is a valid number because here we need multiply by 10 to just make 10 inr
      currency: "INR",
      description: "Test Payment",
      // remember to handle this callback because we need to make redirect when user payment is successful but in
      // production - we need to handle this url 💪🏼
      callback_url: `${process.env.SERVER_DOMAIN_URL}/api/v1/payment/verify`,
      callback_method: "get",
    });

    return res.json({ success: true, paymentUrl: paymentLink.short_url });
  } catch (error) {
    console.error("Error creating payment link:", error);
    return res
      .status(500)
      .json({ success: false, message: "Payment link creation failed" });
  }
};

const paymentVerification = async (req, res) => {
  try {
    // const { payment_id } = req.query;
    console.log("Query Params:", req.query);
    const payment_id = req.query.payment_id || req.query.razorpay_payment_id;
    if (!payment_id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment ID" });
    }
    console.log("Received payment ID:", payment_id);

    const paymentDetails = await instance.payments.fetch(payment_id);

    if (paymentDetails.status === "captured") {
      // because we have 1 user thats why

      const existUser = await User.findOne();
      if (!existUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Increase wallet balance and save
      const amountInINR = paymentDetails.amount / 100;
      existUser.walletBalance += amountInINR;
      await existUser.save();
      // Redirect the user to success page
      return res.redirect("http://192.168.28.68:8081/success");
    }

    return res
      .status(400)
      .json({ success: false, message: "Payment not successful" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
};

module.exports = { checkout, paymentVerification };
