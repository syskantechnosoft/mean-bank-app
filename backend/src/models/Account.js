const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    cardNumber: { type: String },
    cardType: { type: String, enum: ['Debit', 'Credit'] },
    status: { type: String, enum: ['Active', 'Inactive', 'Blocked'], default: 'Inactive' },
    expiryDate: { type: Date },
    cvv: { type: String }
});

const ChequeBookSchema = new mongoose.Schema({
    requestDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Issued'], default: 'Pending' }
});

const AccountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    accountNumber: { type: String, required: true, unique: true },
    accountType: { type: String, enum: ['Savings', 'Current', 'Loan', 'Deposit'], required: true },
    balance: { type: Number, default: 0 },
    cards: [CardSchema],
    chequeBooks: [ChequeBookSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', AccountSchema);
