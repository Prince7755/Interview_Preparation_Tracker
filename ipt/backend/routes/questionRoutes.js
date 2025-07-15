const express = require('express');
const router = express.Router();
const {
    addQuestion,
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
} = require('../controllers/questionController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addQuestion);
router.get('/', authMiddleware, getQuestions);
router.get('/:id', authMiddleware, getQuestionById);
router.put('/:id', authMiddleware, updateQuestion);
router.delete('/:id', authMiddleware, deleteQuestion);

module.exports = router;