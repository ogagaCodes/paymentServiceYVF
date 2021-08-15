const amqp = require("amqplib");
const QURL = process.env.BROKER_URI;
const queue = "orders";
let transactionChannel = null;

/**
 * Connect to RabbitMQ
 */
exports.publishToQueue = async (order) => {
  try {
    const mqConnection = await amqp.connect(QURL);
    transactionChannel = await mqConnection.createChannel();

    // await transactionChannel.assertExchange(EXCHANGE, "fanout", {
    //   durable: false,
    // });
    transactionChannel.assertQueue(queue, {
      durable: true,
    });
    transactionChannel.sendToQueue(queue, Buffer.from(JSON.stringify(order)), {
      persistent: true,
    });
    console.log("ORDER: ", order);
    console.log("AMQP server connected succesfully ");
  } catch (err) {
    console.error(err);
    process.exit();
  }
};
