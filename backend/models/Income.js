const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    icon: {
        type: String,
    },
    source: {
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
}, { timestamps: true });

const Income = mongoose.model('Income', IncomeSchema);

module.exports = Income;