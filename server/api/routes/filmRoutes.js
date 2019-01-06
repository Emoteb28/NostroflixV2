const express = require('express');
const router = express.Router();

//---
const filmController = require('../controllers/filmController');

//---get all----
router.get('/', filmController.getAll);

//---get by id----
router.get('/:id', filmController.getOne);

//----post----
router.post('/', filmController.newFilm);

//----patch-----
router.patch('/:id', filmController.updateFilm);

//----delete----
router.delete('/:id', filmController.deleteFilm);

module.exports = router;