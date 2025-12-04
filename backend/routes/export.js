const express = require("express");
const asyncHandler = require("express-async-handler");
const ExcelJS = require("exceljs");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { protect } = require("../middleware/auth");

const router = express.Router();

// export incomes to excel
router.get(
  "/incomes",
  protect,
  asyncHandler(async (req, res) => {
    const incomes = await Income.find({ user: req.user._id }).sort({
      date: -1,
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Incomes");
    sheet.columns = [
      { header: "Title", key: "title", width: 30 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 20 },
      { header: "Source", key: "source", width: 20 },
      { header: "Notes", key: "notes", width: 40 },
    ];
    incomes.forEach((i) =>
      sheet.addRow({
        title: i.title,
        amount: i.amount,
        date: i.date.toISOString(),
        source: i.source,
        notes: i.notes,
      })
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=incomes.xlsx");
    await workbook.xlsx.write(res);
    res.end();
  })
);

// export expenses
router.get(
  "/expenses",
  protect,
  asyncHandler(async (req, res) => {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Expenses");
    sheet.columns = [
      { header: "Title", key: "title", width: 30 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 20 },
      { header: "Category", key: "category", width: 20 },
      { header: "Notes", key: "notes", width: 40 },
    ];
    expenses.forEach((e) =>
      sheet.addRow({
        title: e.title,
        amount: e.amount,
        date: e.date.toISOString(),
        category: e.category,
        notes: e.notes,
      })
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");
    await workbook.xlsx.write(res);
    res.end();
  })
);

module.exports = router;
