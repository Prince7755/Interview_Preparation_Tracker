const express = require('express');
const router = express.Router();

const {
  createSystemDesign,
  getSystemDesign, 
  getSystemDesignById,
  updateSystemDesign,
  deleteSystemDesign
} = require('../controllers/systemDesignController');

const auth = require('../middleware/authMiddleware');

router.post('/', auth, createSystemDesign);
router.get('/', auth, getSystemDesign);
router.get('/:id', auth, getSystemDesignById);
router.put('/:id', auth, updateSystemDesign);
router.delete('/:id', auth, deleteSystemDesign);

module.exports = router;
