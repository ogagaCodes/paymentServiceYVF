const mongoose = require("mongoose");
const { publishToQueue } = require("../../helpers/brokers/publish");
const { consumeFromQueue } = require("../../helpers/brokers/consume");

exports.initiatePayment = async (data) => {
  try {
      //  send details to queue
     publishToQueue(data);
     consumeFromQueue();
    return {
      error: false,
      message: "Payment successful",
      data: null,
    };
  } catch (err) {
    console.log(err?.response?.data || err);
    return {
      error: true,
      message: "Error making payment",
      data: err?.response?.data || err,
    };
  }
};
       
