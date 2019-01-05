const express = require('express');
const router = express.Router();

//---
const categorieController = require('../controllers/categorieController');

//---get all----
router.get('/', categorieController.getAll);

//---get by id----
router.get('/:id', categorieController.getOne);

//----post----
router.post('/', categorieController.newCategorie);

//----put-----
router.put('/:id', categorieController.updateCategorie);

//----delete----
router.delete('/:id', categorieController.deleteCategorie);

module.exports = router;