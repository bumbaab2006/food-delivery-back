const express = require("express");
const router = express.Router();
const OrderedFoodsController = require("../controllers/OrderedFoodsController");

router.post("/", OrderedFoodsController.createOrderedFood);
router.get("/", OrderedFoodsController.getAllOrderedFoods);
router.get("/:id", OrderedFoodsController.getOrderedFoodById);
router.put("/:id/status", OrderedFoodsController.updateOrderedFoodStatus);
router.delete("/:id", OrderedFoodsController.deleteOrderedFood);

module.exports = router;
