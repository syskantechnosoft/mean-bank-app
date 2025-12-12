const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.post('/payees', auth, userController.addPayee);
router.put('/payees', auth, userController.updatePayee);
router.delete('/payees/:payeeId', auth, userController.deletePayee);

module.exports = router;
