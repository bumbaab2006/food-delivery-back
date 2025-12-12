const OrderedFoods = require("../models/OrderedFoods");

const OrderedFoodsController = {
  // CREATE ORDER
  createOrderedFood: async (req, res) => {
    try {
      const order = new OrderedFoods(req.body);
      const saved = await order.save();
      res.status(201).json(saved);
    } catch (error) {
      console.log("Order Save Error:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // GET ONE ORDER
  getOrderedFoodById: async (req, res) => {
    try {
      const order = await OrderedFoods.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // GET ALL ORDERS (with optional date filter)
  getAllOrderedFoods: async (req, res) => {
    try {
      const { start, end } = req.query;

      let filter = {};

      // 🟦 If date range exists → add filter
      if (start && end) {
        const startDate = new Date(start);
        startDate.setHours(0, 0, 0, 0); // Өдрийн эхлэл - локал цагтай

        const endDate = new Date(end);
        endDate.setHours(23, 59, 59, 999); // Өдрийн төгсгөл - локал цагтай

        filter.orderedAt = {
          $gte: startDate,
          $lte: endDate,
        };
      }

      const orders = await OrderedFoods.find(filter).populate("user");
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // UPDATE ORDER STATUS
  updateOrderedFoodStatus: async (req, res) => {
    try {
      const updated = await OrderedFoods.findByIdAndUpdate(
        req.params.id,
        { orderStatus: req.body.status },
        { new: true }
      );

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // DELETE ORDER
  deleteOrderedFood: async (req, res) => {
    try {
      await OrderedFoods.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Order deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = OrderedFoodsController;
