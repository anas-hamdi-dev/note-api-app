const express = require("express");
const asyncHandler = require("express-async-handler");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { protect } = require("../middleware/auth");

const router = express.Router();

// totals by month for line chart (last 12 months)
router.get(
  "/monthly",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const now = new Date();
    0;
    const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    const incomes = await Income.aggregate([
      { $match: { user: userId, date: { $gte: start } } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const expenses = await Expense.aggregate([
      { $match: { user: userId, date: { $gte: start } } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json({ incomes, expenses });
  })
);

// category breakdown for pie chart
router.get(
  "/categories",
  protect,
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const categories = await Expense.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }, 
    ]);
    res.json(categories);
  })
);

module.exports = router;
