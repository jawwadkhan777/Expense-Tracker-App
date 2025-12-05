const XLSX = require('xlsx');
const Expense = require('../models/Expense');


// Controller to handle adding expense entry
exports.addExpense = async (req, res) => {
    const userId = req.user?.id;
    try {
        const { icon, category, amount, date } = req.body;
        if (!category || !amount) {
            return res.status(400).json({ message: 'Category and amount are required' });
        }
        
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date
        });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
// Controller to get all expense entries
exports.getAllExpense = async (req, res) => {
    const userId = req.user?.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Controller to delete an expense entry
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Expense entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Controller to download expense data as an Excel file
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user?.id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    const data = expenses.map(expense => ({
      Icon: expense.icon ?? '',
      Category: expense.category ?? '',
      Amount: expense.amount ?? 0,
      Date: expense.date ? (new Date(expense.date)).toISOString().split('T')[0] : ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');

    // Write workbook to a buffer (xlsx format)
    const wbOptions = { bookType: 'xlsx', type: 'buffer' };
    const excelBuffer = XLSX.write(workbook, wbOptions);

    // Prepare filename with timestamp to be unique
    const filename = `ExpenseData_${userId}_${new Date().toISOString().replace(/[:.]/g,'-')}.xlsx`;
    // Set download headers
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send buffer directly
    return res.send(excelBuffer);

  } catch (error) {
    console.error('downloadIncomeExcel error:', error);
    return res.status(500).json({ message: 'Server error' }); // avoid leaking full error in production
  }
};