const mongoose = require("mongoose");

const orderedFoodsSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },

    foodItems: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],

    deliveryLocation: { type: String, required: true },
    totalPrice: { type: Number, required: true },

    orderStatus: {
      type: String,
      enum: ["pending", "delivered", "canceled"],
      default: "pending",
    },

    orderedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderedFoods", orderedFoodsSchema);
