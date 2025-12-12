const mongoose = require("mongoose");

let isConnected = false; // Холболт үүссэн эсэхийг хадгалах

const connectToDB = async () => {
  if (isConnected) return; // Аль хэдийн холболт байна бол дахин холбохгүй

  try {
    await mongoose.connect(
      "mongodb+srv://Bumbayar:Pi06252311@food-delivery.bhwicih.mongodb.net/food-delivery?retryWrites=true&w=majority",
      {
        // Optional settings
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10, // concurrent request
      }
    );
    isConnected = true;
    console.log("Database connection success");
  } catch (err) {
    console.log("Database connection failed", err);
  }
};

module.exports = connectToDB;

// "mongodb+srv://Bumbayar:Pi06252311@food-delivery.bhwicih.mongodb.net/"
