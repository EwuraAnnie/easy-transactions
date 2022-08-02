const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/virtual_bank");
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  dbConnect,
};
