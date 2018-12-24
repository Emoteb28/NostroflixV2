const express = require('express');
const router = express.Router();

//---get all----
router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'get request to /categories'
    });
});

//---get by id----
router.get('/:id',(req, res, next) => {
    res.status(200).json({
        message: 'get request to /categories/'+req.params.id,
        filmId: req.params.id
    });
});


//----post----
router.post('/',(req, res, next) => {
    res.status(200).json({
        message: 'post request to /categories'
    });
});

//----put----
router.put('/:id',(req, res, next) => {
    res.status(200).json({
        message: 'put request to /categories/'+req.params.id,
        filmId: req.params.id
    });
});

//----delete----
router.delete('/:id',(req, res, next) => {
    res.status(200).json({
        message: 'delete request to /categories/'+req.params.id,
        filmId: req.params.id
    });
});

module.exports = router;