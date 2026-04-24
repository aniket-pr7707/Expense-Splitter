const Expense = require('../models/Expense');
const Group = require('../models/Group');

// Add expense
exports.addExpense = async (req, res) => {
  try {
    const { description, amount, groupId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Split equally among all members
    const splitAmount = amount / group.members.length;
    const splitBetween = group.members.map(memberId => ({
      user: memberId,
      amount: splitAmount
    }));

    const expense = await Expense.create({
      description,
      amount,
      paidBy: req.user.id,
      group: groupId,
      splitBetween
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get expenses for a group
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ group: req.params.groupId })
      .populate('paidBy', 'name email')
      .populate('splitBetween.user', 'name email');

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Calculate balances
exports.getBalances = async (req, res) => {
  try {
    const expenses = await Expense.find({ group: req.params.groupId })
      .populate('paidBy', 'name email')
      .populate('splitBetween.user', 'name email');

    const balances = {};

    expenses.forEach(expense => {
      const payerId = expense.paidBy._id.toString();
      const payerName = expense.paidBy.name;

      if (!balances[payerId]) {
        balances[payerId] = { name: payerName, balance: 0 };
      }
      balances[payerId].balance += expense.amount;

      expense.splitBetween.forEach(split => {
        const userId = split.user._id.toString();
        const userName = split.user.name;

        if (!balances[userId]) {
          balances[userId] = { name: userName, balance: 0 };
        }
        balances[userId].balance -= split.amount;
      });
    });

    res.json(balances);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};