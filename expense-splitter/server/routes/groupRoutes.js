const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createGroup,
  getGroups,
  addMember,
  addMemberByEmail,
  deleteGroup
} = require('../controllers/groupController');

router.post('/', auth, createGroup);
router.get('/', auth, getGroups);
router.post('/:id/members', auth, addMember);
router.post('/:id/members/email', auth, addMemberByEmail);
router.delete('/:id', auth, deleteGroup);

module.exports = router;