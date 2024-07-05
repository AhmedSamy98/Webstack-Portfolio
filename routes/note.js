const express = require('express');
const router = express.Router();
const { getNotes, createNote, updateNote } = require('../controllers/noteController');
const auth = require('../middleware/auth');

router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.put('/:id', auth, updateNote);

module.exports = router;
