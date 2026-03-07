const mongoose = require("mongoose");

let isConnected = false;

const connectionUri =
  process.env.MONGO_URI ||
  "mongodb+srv://Bumbayar:Pi06252311@food-delivery.bhwicih.mongodb.net/food-delivery?retryWrites=true&w=majority";

const connectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(connectionUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    console.log("Database connection success");
  } catch (err) {
    console.log("Database connection failed", err);
    throw err;
  }
};

module.exports = connectToDB;
