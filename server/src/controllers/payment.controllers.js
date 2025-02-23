const instance = require("../config/instance.config.js");

const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  console.log(order);
  return res.status(200).json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  res.status(200).json({
    success: true,
    order,
  });
};

module.exports = { checkout, paymentVerification };
