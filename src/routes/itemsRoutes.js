const express = require('express');
const router = express.Router();
const { getAll, getById, createItem, updateItem, deleteItem } = require('../controllers/itemsControllers');

router.get('/items', getAll);
router.get('/items/:id', getById);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

module.exports = router;
