const express = require('express');
const router = express.Router();
const{
    createBehavioral,
    getBehavioral,
    getBehavioralById,
    updateBehavioral,
    deleteBehavioral
} = require('../controllers/behavioralController');

const auth = require('../middleware/authMiddleware');

router.post('/', auth, createBehavioral);
router.get('/', auth, getBehavioral);
router.get('/:id', auth, getBehavioralById);
router.put('/:id', auth, updateBehavioral);
router.delete('/:id', auth, deleteBehavioral);

module.exports = router;
