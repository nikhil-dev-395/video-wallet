const {
  checkout,
  paymentVerification,
} = require("../controllers/payment.controllers");

const router = require("express").Router();
router.post("/checkout", checkout);
router.post("/paymentVerification", paymentVerification);
module.exports = { paymentRouter: router };
