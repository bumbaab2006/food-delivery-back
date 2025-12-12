const foodCategory = require("../models/foodCategory");
// back-end/controllers/foodCategoryController.js

// Бүх хоолны категориудыг авах
exports.getAllFoodCategories = async (req, res) => {
  try {
    const categories = await foodCategory.find(); // MongoDB-оос бүх өгөгдөл авах
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Шинэ хоолны категори үүсгэх
exports.createFoodCategory = async (req, res) => {
  try {
    const category = new foodCategory(req.body); // body-гийн өгөгдлөөр шинэ объект үүсгэнэ
    const savedCategory = await category.save(); // DB-д хадгална
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Нэг хоолны категориыг ID-аар авах
exports.getFoodCategoryById = async (req, res) => {
  try {
    const category = await foodCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Food Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Шинэчлэх
exports.updateFoodCategory = async (req, res) => {
  try {
    const updated = await foodCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // шинэчилсэн өгөгдлийг буцаана
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Устгах
exports.deleteFoodCategory = async (req, res) => {
  try {
    await foodCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Food Category deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
