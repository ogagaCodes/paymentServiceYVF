const { Router } = require("express");
const paymentController = require("./payment.controller");
const validateRequest = require("../../middlewares/validateRequest");
const paymentSchema = require("./payment.schema");



const router = Router();
router.post(
  "/initiate",
  validateRequest(paymentSchema.paymentSchema, "body"),
  paymentController.initiatePaymentController
);



module.exports = router;
