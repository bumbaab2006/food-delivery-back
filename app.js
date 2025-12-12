require("dotenv").config();
const express = require("express");
const connectToDB = require("./db");
const cors = require("cors");

const app = express();

// ✔ Fix CORS here
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://x32xf9g6-3000.asse.devtunnels.ms",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✔ Allow OPTIONS preflight
app.options("*", cors());

app.use(express.json());
connectToDB();

// Routes
app.use("/order-foods", require("./routes/OrderedFoodsRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/food-menu", require("./routes/foodCategoryRoutes"));
app.use("/products", require("./routes/productRoutes"));

// ✔ FIX: Render must use process.env.PORT
const PORT = process.env.PORT || 999;

app.listen(PORT, () => console.log("Server running on port " + PORT));
