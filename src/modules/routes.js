const { Router } = require("express");
const payment = require("./payment/payment.routes");

module.exports = () => {
  const router = Router();

  router.use("/", payment);
  return router;
};
