const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    type: { type: String, enum: ['Deposit', 'Withdraw', 'Transfer'], required: true },
    amount: { type: Number, required: true },
    toAccount: { type: String }, // Account Number
    date: { type: Date, default: Date.now },
    description: { type: String }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
