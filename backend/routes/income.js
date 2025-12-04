const express = require("express");
const asyncHandler = require("express-async-handler");
const Income = require("../models/Income");
const { protect } = require("../middleware/auth");

const router = express.Router();

// create income
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { title, amount, date, source, notes } = req.body;
    const income = await Income.create({
      user: req.user._id,
      title,
      amount,
      date,
      source,
      notes,
    });
    res.status(201).json(income);
  })
);

// get all incomes for user (with pagination)
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const incomes = await Income.find({ user: req.user._id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    res.json(incomes);
  })
);

// delete income
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const income = await Income.findById(req.params.id);
    if (!income) {
      res.status(404);
      throw new Error("Income not found");
    }
    if (income.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to delete this income");
    }
    await income.deleteOne();
    res.json({ message: "Income removed" });
  })
);

module.exports = router;
