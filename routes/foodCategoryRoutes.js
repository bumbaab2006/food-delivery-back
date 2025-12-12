const express = require("express");
const router = express.Router();
const foodCategoryController = require("../controllers/foodCategoryController");

router.get("/", foodCategoryController.getAllFoodCategories);
router.post("/", foodCategoryController.createFoodCategory);
router.get("/:id", foodCategoryController.getFoodCategoryById);
router.put("/:id", foodCategoryController.updateFoodCategory);
router.delete("/:id", foodCategoryController.deleteFoodCategory);

module.exports = router;
