const XLSX = require('xlsx');
const Income = require('../models/Income');


// Controller to handle adding income
exports.addIncome = async (req, res) => {
    const userId = req.user?.id;
    try {
        const { icon, source, amount, date } = req.body;
        if (!source || !amount) {
            return res.status(400).json({ message: 'Source and amount are required' });
        }
        
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date
        });
        const savedIncome = await newIncome.save();
        res.status(201).json(savedIncome);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Controller to get all income entries
exports.getAllIncome = async (req, res) => {
    const userId = req.user?.id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Controller to delete an income entry
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Income entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Controller to download income data as an Excel file
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user?.id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    const data = incomes.map(income => ({
      Source: income.source ?? '',
      Amount: income.amount ?? 0,
      Date: income.date ? (new Date(income.date)).toISOString().split('T')[0] : ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Incomes');

    // Write workbook to a buffer (xlsx format)
    const wbOptions = { bookType: 'xlsx', type: 'buffer' };
    const excelBuffer = XLSX.write(workbook, wbOptions);

    // Prepare filename with timestamp to be unique
    const filename = `IncomeData_${userId}_${new Date().toISOString().replace(/[:.]/g,'-')}.xlsx`;

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