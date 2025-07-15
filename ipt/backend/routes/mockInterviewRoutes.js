const express  = require('express');
const router = express.Router();
const {
    createMockInterview,
    getMockInterview,
    getMockInterviewById,
    updateMockInterview,
    deleteMockInterview
} = require('../controllers/mockInterviewController');

const auth = require('../middleware/authMiddleware');

router.post('/', auth, createMockInterview);
router.get('/', auth, getMockInterview);
router.get('/:id', auth, getMockInterviewById);
router.put('/:id', auth, updateMockInterview);
router.delete('/:id', auth, deleteMockInterview);

module.exports = router;