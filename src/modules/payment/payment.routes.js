const { Router } = require("express");
const paymentController = require("./payment.controller");




const router = Router();
router.post(
  "/initiate",
  paymentController.initiatePaymentController
);



module.exports = router;
