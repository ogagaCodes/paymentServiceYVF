const mongoose = require("mongoose");
const { publishToQueue } = require("../../helpers/brokers/publish");
const { consumeFromQueue } = require("../../helpers/brokers/consume");

exports.initiatePayment = async (order) => {
  try {
      //  consume frome order queue
    //  consumeFromQueue();
    //  publishToQueue(order);
    return {
      error: false,
      message: "Payment successful... pending confirmation..",
      data: order,
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "Error making payment",
      data: err,
    };
  }
};
       
