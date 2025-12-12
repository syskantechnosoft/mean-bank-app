const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

exports.createAccount = async (req, res) => {
    const { accountType } = req.body;
    try {
        const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const account = new Account({
            user: req.user.id,
            accountNumber,
            accountType,
            balance: 0
        });
        await account.save();
        res.json(account);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({ user: req.user.id });
        res.json(accounts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deposit = async (req, res) => {
    const { accountId, amount } = req.body;
    try {
        const account = await Account.findById(accountId);
        if (!account) return res.status(404).json({ msg: 'Account not found' });

        // Ensure user owns account
        if (account.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        account.balance += Number(amount);
        await account.save();

        const transaction = new Transaction({
            account: accountId,
            type: 'Deposit',
            amount,
            description: 'Cash Deposit'
        });
        await transaction.save();

        res.json(account);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.withdraw = async (req, res) => {
    const { accountId, amount } = req.body;
    try {
        const account = await Account.findById(accountId);
        if (!account) return res.status(404).json({ msg: 'Account not found' });

        if (account.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        if (account.balance < amount) return res.status(400).json({ msg: 'Insufficient funds' });

        account.balance -= Number(amount);
        await account.save();

        const transaction = new Transaction({
            account: accountId,
            type: 'Withdraw',
            amount,
            description: 'Cash Withdrawal'
        });
        await transaction.save();

        res.json(account);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.transfer = async (req, res) => {
    const { fromAccountId, toAccountNumber, amount } = req.body;
    try {
        const fromAccount = await Account.findById(fromAccountId);
        const toAccount = await Account.findOne({ accountNumber: toAccountNumber });

        if (!fromAccount || !toAccount) return res.status(404).json({ msg: 'Account not found' });

        if (fromAccount.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        if (fromAccount.balance < amount) return res.status(400).json({ msg: 'Insufficient funds' });

        fromAccount.balance -= Number(amount);
        toAccount.balance += Number(amount);

        await fromAccount.save();
        await toAccount.save();

        const transactionFrom = new Transaction({
            account: fromAccountId,
            type: 'Transfer',
            amount: -amount,
            toAccount: toAccountNumber,
            description: `Transfer to ${toAccountNumber}`
        });

        // Optionally record for receiver too, but requirement just says fund transfer
        // Let's record positive transaction for receiver? Not strictly needed for simple app but good practice.
        // I will stick to recording sender's transaction as per primary requirement.

        await transactionFrom.save();

        res.json({ msg: 'Transfer successful', balance: fromAccount.balance });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.requestCard = async (req, res) => {
    const { accountId, cardType } = req.body;
    try {
        const account = await Account.findById(accountId);
        if (!account) return res.status(404).json({ msg: 'Account not found' });

        const cardNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 5);

        account.cards.push({
            cardNumber,
            cardType,
            status: 'Inactive',
            expiryDate,
            cvv: Math.floor(100 + Math.random() * 900).toString()
        });

        await account.save();
        res.json(account.cards);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.toggleCardStatus = async (req, res) => {
    const { accountId, cardId, status } = req.body;
    try {
        const account = await Account.findById(accountId);
        if (!account) return res.status(404).json({ msg: 'Account not found' });

        const card = account.cards.id(cardId);
        if (!card) return res.status(404).json({ msg: 'Card not found' });

        card.status = status;
        await account.save();
        res.json(card);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.requestChequeBook = async (req, res) => {
    const { accountId } = req.body;
    try {
        const account = await Account.findById(accountId);
        if (!account) return res.status(404).json({ msg: 'Account not found' });

        account.chequeBooks.push({ requestDate: new Date(), status: 'Pending' });
        await account.save();
        res.json(account.chequeBooks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
