const express = require("express");
const asyncHandler = require("express-async-handler");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { protect } = require("../middleware/auth");

const router = express.Router();

// summary: totals and recent transactions
router.get(
  "/summary",
  protect,
  asyncHandler(async (req, res) => {
    const incomes = await Income.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const expenses = await Expense.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalIncome = incomes[0] ? incomes[0].total : 0;
    const totalExpense = expenses[0] ? expenses[0].total : 0;
    const balance = totalIncome - totalExpense;

    const recentIncomes = await Income.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(5);
    const recentExpenses = await Expense.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(5);

    res.json({
      totalIncome,
      totalExpense,
      balance,
      recentIncomes,
      recentExpenses,
    });
  })
);

module.exports = router;
