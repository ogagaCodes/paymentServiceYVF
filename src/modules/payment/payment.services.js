const mongoose = require("mongoose");
const { publishToQueue } = require("../../helpers/brokers/publish");
const { consumeFromQueue } = require("../../helpers/brokers/consume");

exports.initiatePayment = async () => {
  try {
      //  consume frome order queue
     consumeFromQueue();
    return {
      error: false,
      message: "Payment successfu... pending confirmation..",
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
       
