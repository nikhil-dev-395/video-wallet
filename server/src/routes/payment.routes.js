const {
  checkout,
  paymentVerification,
  // webhookHandler,
} = require("../controllers/payment.controllers");

const router = require("express").Router();
router.post("/checkout", checkout);
router.get("/verify", paymentVerification);
// router.get("/webhook", webhookHandler);
module.exports = { paymentRouter: router };
