const mongoose = require("mongoose");

let isConnected = false;

const connectionUri =
  process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL;

const getConnectionHelpMessage = (error) => {
  if (!connectionUri) {
    return "MONGO_URI, MONGODB_URI, esvel MONGO_URL env variable Render deer tohiruulagdaagui baina.";
  }

  if (error?.code === "ENOTFOUND" && error?.syscall === "querySrv") {
    return `MongoDB cluster host oldsongui. Render deer baigaa MONGO_URI buruu baina: ${error.hostname}`;
  }

  if (error?.message?.includes("bad auth")) {
    return "MongoDB username эсвэл password буруу байна.";
  }

  return "MongoDB holbolt amжилтгүй боллоо.";
};

const connectToDB = async () => {
  if (isConnected) return;

  if (!connectionUri) {
    throw new Error(
      "MONGO_URI, MONGODB_URI, esvel MONGO_URL env variable Render deer zaaval тохируулах шаардлагатай."
    );
  }

  try {
    await mongoose.connect(connectionUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    console.log("Database connection success");
  } catch (err) {
    console.log("Database connection failed", err);
    console.error(getConnectionHelpMessage(err));
    throw err;
  }
};

module.exports = connectToDB;
