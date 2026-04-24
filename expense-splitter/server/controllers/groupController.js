const Group = require('../models/Group');

// Create a group
exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    const group = await Group.create({
      name,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all groups for logged in user
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.user.id
    }).populate('members', 'name email');

    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add member to group
exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({ message: 'User already in group' });
    }

    group.members.push(userId);
    await group.save();

    res.json(group);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};