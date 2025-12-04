const express = require("express");
const asyncHandler = require("express-async-handler");
const Expense = require("../models/Expense");
const { protect } = require("../middleware/auth");

const router = express.Router();

// create expense
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { title, amount, date, category, notes } = req.body;
    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      date,
      category,
      notes,
    });
    res.status(201).json(expense);
  })
);

// get all expenses for user (with pagination)
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const expenses = await Expense.find({ user: req.user._id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    res.json(expenses);
  })
);

// delete expense
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
    }
    if (expense.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to delete this expense");
    }
    await expense.deleteOne();
    res.json({ message: "Expense removed" });
  })
);

module.exports = router;
