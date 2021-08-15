const mongoose = require("mongoose");

const TransactionHistorySchema = mongoose.Schema(
  {
    customer_id: {
      type: String
    },
    order_id: {
      type: String
    },
    product_id: {
      type: String
    },
    amount: {
      type: Number
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const TransactionHistoryData = mongoose.model(
  "TransactionHistoryData",
  TransactionHistorySchema
);

module.exports = TransactionHistoryData;
