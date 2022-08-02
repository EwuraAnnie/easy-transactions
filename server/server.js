const express = require("express");
const createError = require("http-errors");
const cors = require("cors");
require("dotenv").config();

const { dbConnect } = require("./config/dbConnect");
const authRouter = require("./routes/auth.route");
const transactionRouter = require("./routes/transaction.router");

const app = express();

app.use(cors({}));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/transactions", transactionRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

async function start() {
  // connection to database
  await dbConnect();

  app.listen(4000, () => {
    console.log("🚀 Server up and running on port 4000");
  });
}

start();
