const express = require('express');
const router = express.Router();

//---get all----
router.get('/',(req, res, next) => {
    res.status(200).json({
        message: 'get request to /films'
    });
});

//---get by id----
router.get('/:id',(req, res, next) => {
    res.status(200).json({
        message: 'get request to /films/'+req.params.id,
        filmId: req.params.id
    });
});


//----post----
router.post('/',(req, res, next) => {
    const film = {
        name: req.body.name,
        description: req.body.description
    }
    res.status(200).json({
        message: 'post request to /films',
        createdFilm: film
    });
});

//----put----
router.put('/:id',(req, res, next) => {
    res.status(200).json({
        message: 'put request to /films/'+req.params.id,
        filmId: req.params.id
    });
});

//----delete----
router.delete('/:id',(req, res, next) => {
    res.status(200).json({
        message: 'delete request to /films/'+req.params.id,
        filmId: req.params.id
    });
});

module.exports = router;