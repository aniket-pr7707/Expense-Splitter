const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addExpense,
  getExpenses,
  getBalances
} = require('../controllers/expenseController');

router.post('/', auth, addExpense);
router.get('/:groupId', auth, getExpenses);
router.get('/:groupId/balances', auth, getBalances);

module.exports = router;