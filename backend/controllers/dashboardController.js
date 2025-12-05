const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// @desc    Get dashboard data
// @route   GET /api/v1/
// @access  Private
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // console.log("REQ USER:", req.user);
    // console.log("REQ USER ID:", req.user?.id);
    // console.log("Is valid ObjectId:", isValidObjectId(req.user?.id));

    // Aggregate total income
    const totalIncomeResult = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalIncome = totalIncomeResult[0] ? totalIncomeResult[0].total : 0;

    // console.log("totalIncome", {
    //   totalIncome,
    //   userId: isValidObjectId(userId),
    // });

    // Aggregate total expenses
    const totalExpenseResult = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpense = totalExpenseResult[0]
      ? totalExpenseResult[0].total
      : 0;

    // Get income transactions last 60 days
    const incomeTransactionsLast60Days = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });
    // Get total income last 60 days
    const totalIncomeLast60DaysResult = incomeTransactionsLast60Days.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    // Get expense transactions last 60 days
    const expenseTransactionsLast60Days = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });
    // Get total expense last 60 days
    const totalExpenseLast60DaysResult = expenseTransactionsLast60Days.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    // Get recent 5 transactions (income + expense)
    const recentIncome = await Income.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5);
    const recentExpense = await Expense.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5);
    const recentTransactions = [...recentIncome, ...recentExpense]
      .sort((a, b) => b.date - a.date) // sort by date descending
      .slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        totalBalance: totalIncome - totalExpense,
        totalIncome,
        totalExpense,
        totalIncomeLast60Days: {
          total: totalIncomeLast60DaysResult,
          transactions: incomeTransactionsLast60Days,
        },
        totalExpenseLast60Days: {
          total: totalExpenseLast60DaysResult,
          transactions: expenseTransactionsLast60Days,
        },
        recentTransactions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
