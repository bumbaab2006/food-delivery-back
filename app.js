require("dotenv").config();
const express = require("express");
const connectToDB = require("./db");
const cors = require("cors");

const app = express();

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOriginPatterns = [
  /^http:\/\/localhost:\d+$/,
  /^https:\/\/.*\.vercel\.app$/,
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    const isConfigured = configuredOrigins.includes(origin);
    const matchesPattern = allowedOriginPatterns.some((pattern) =>
      pattern.test(origin)
    );

    if (isConfigured || matchesPattern) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// Routes
app.use("/order-foods", require("./routes/OrderedFoodsRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/food-menu", require("./routes/foodCategoryRoutes"));
app.use("/products", require("./routes/productRoutes"));

const PORT = process.env.PORT || 999;

const start = async () => {
  await connectToDB();
  app.listen(PORT, () => console.log("Server running on port " + PORT));
};

start().catch((error) => {
  console.error("Server failed to start", error);
  process.exit(1);
});
