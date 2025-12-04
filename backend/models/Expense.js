const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    icon: {
        type: String,
        default: ''
    },
    category: {   
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
        // description: {
    //     type: String,
    // }
}, { timestamps: true
});

const expense = mongoose.model('Expense', expenseSchema);
module.exports = expense;