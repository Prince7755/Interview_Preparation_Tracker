const express = require('express');
const router = express.Router();
const {
    createTask,
    getTask,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/plannerController');

const auth = require('../middleware/authMiddleware');

router.post ('/', auth, createTask);
router.get('/', auth, getTask);
router.get('/:id', auth, getTaskById);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;