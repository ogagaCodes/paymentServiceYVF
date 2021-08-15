const amqp = require("amqplib");
const QURL = process.env.BROKER_URI;
const queue = "orders";
let transactionDetailsChannel = null;
const TransactionHistory = require("../../modules/models/transaction.model");

/**
 * Connect to RabbitMQ
 */
exports.consumeFromQueue = async () => {
  try {
    const mqConnection = await amqp.connect(QURL);
    transactionDetailsChannel = await mqConnection.createChannel();
    transactionDetailsChannel.assertQueue(queue, {
      durable: true,
    });

    await transactionDetailsChannel.consume(
      queue,
      async (order) => {
        await TransactionHistory.create({
          customer_id: order.customer_id,
          order_id: order.order_id,
          product_id: order.product_id,
          amount: order.amount,
        });
      },
      {
        noAck: false,
      }
    );
  } catch (err) {
    console.error(err);
    process.exit();
  }
};
