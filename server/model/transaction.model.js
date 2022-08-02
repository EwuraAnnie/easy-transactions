const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    actions: [
      {
        ref: {
          type: String,
          required: true,
        },
        transactionType: {
          type: String,
          required: true,
          enum: ["Debit", "Credit", "Reversal"],
        },
        status: {
          type: String,
          required: true,
          enum: ["Pending", "Failed", "Success"],
        },
        party: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Transaction", transactionSchema);
