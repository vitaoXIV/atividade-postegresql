const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsControllers');

router.get('/items', itemsController.getAll);
router.get('/items/:id', itemsController.getById);
router.post('/items', itemsController. createItem);
router.put('/items/:id', itemsController.updateItem);
router.delete('/items/:id', itemsController.deleteItem);

module.exports = router;
