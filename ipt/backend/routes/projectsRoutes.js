const express = require('express');
const router = express.Router();
const {
    createProject,
    getProject,
    getProjectById,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

const auth = require('../middleware/authMiddleware');

router.post('/', auth, createProject);
router.get('/', auth, getProject);
router.get('/:id', auth, getProjectById);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;