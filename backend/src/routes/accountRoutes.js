const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const auth = require('../middleware/auth');

router.post('/', auth, accountController.createAccount);
router.get('/', auth, accountController.getAccounts);
router.post('/deposit', auth, accountController.deposit);
router.post('/withdraw', auth, accountController.withdraw);
router.post('/transfer', auth, accountController.transfer);
router.post('/card', auth, accountController.requestCard);
router.put('/card/status', auth, accountController.toggleCardStatus);
router.post('/cheque', auth, accountController.requestChequeBook);

module.exports = router;
