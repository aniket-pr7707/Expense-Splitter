const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createGroup,
  getGroups,
  addMember
} = require('../controllers/groupController');

router.post('/', auth, createGroup);
router.get('/', auth, getGroups);
router.post('/:id/members', auth, addMember);

module.exports = router;