const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateProfile = async (req, res) => {
    const { name, phone, address } = req.body;
    try {
        let user = await User.findById(req.user.id);
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addPayee = async (req, res) => {
    const { name, accountNumber, bankName } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.payees.push({ name, accountNumber, bankName });
        await user.save();
        res.json(user.payees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updatePayee = async (req, res) => {
    const { payeeId, name, accountNumber, bankName } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const payee = user.payees.id(payeeId);

        if (!payee) return res.status(404).json({ msg: 'Payee not found' });

        if (name) payee.name = name;
        if (accountNumber) payee.accountNumber = accountNumber;
        if (bankName) payee.bankName = bankName;

        await user.save();
        res.json(user.payees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deletePayee = async (req, res) => {
    const { payeeId } = req.params;
    try {
        const user = await User.findById(req.user.id);
        user.payees = user.payees.filter(p => p.id !== payeeId);
        await user.save();
        res.json(user.payees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
