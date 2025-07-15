const express = require('express');
const router = express.Router();
const {
    createCSSubject,
    getCSSubject,
    getCSSubjectById,
    updateCSSubject,
    deleteCSSubject
} = require('../controllers/csSubjectController');

const auth = require('../middleware/authMiddleware');

router.post('/', auth, createCSSubject);
router.get('/', auth, getCSSubject);
router.get('/:id', auth, getCSSubjectById);
router.put('/:id', auth, updateCSSubject);
router.delete('/:id', auth, deleteCSSubject);

module.exports = router;