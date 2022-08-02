const { nanoid } = require("nanoid");
const { Types } = require("mongoose");
const Transaction = require("../model/transaction.model");
const { getDate } = require("../utils/getDate");

const getAllTransactions = async (req, res) => {
  let { userId } = req;
  userId = Types.ObjectId(userId);

  const transactions = await Transaction.find({ userId });
  return res.status(200).json(transactions);
};

const createTransaction = async (req, res) => {
  const { body, userId } = req;
  const date = getDate();
  const ref = nanoid(10);

  let transaction = await Transaction.findOne({ date });
  let newTransaction = {
    ref,
    transactionType: body.transactionType,
    status: body.status,
    party: body.party,
    amount: body.amount,
  };

  if (transaction) {
    transaction.actions.push(newTransaction);
    await transaction.save();
  } else {
    transaction = Transaction.create({
      date,
      userId,
      actions: [newTransaction],
    });
  }

  return res.status(201).json(transaction);
};

module.exports = {
  createTransaction,
  getAllTransactions,
};
