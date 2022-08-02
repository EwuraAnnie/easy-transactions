const {
  getAllTransactions,
  createTransaction,
} = require("../controllers/transaction.controller");
const { authRequired } = require("../middlewares/authRequired");

const transactionRouter = require("express").Router();

transactionRouter
  .route("/")
  .all(authRequired)
  .get(getAllTransactions)
  .post(createTransaction);

module.exports = transactionRouter;
