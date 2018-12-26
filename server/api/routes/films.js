const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//---
const Film = require('../models/film');

//---get all----
router.get('/',(req, res, next) => {
    Film.find()
        .select("_id name description")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                films: docs.map(doc => {
                  return {
                    _id: doc._id,
                    name: doc.name,
                    description: doc.description,
                    request: {
                      type: "GET",
                      url: "http://localhost:3000/films/" + doc._id
                    }
                  };
                })
              };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//---get by id----
router.get('/:id',(req, res, next) => {
    const id = req.params.id;
    Film.findById(id)
        .select("_id name description")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    film: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/films'
                    }
                });
            } else {
                res.status(400).json({
                    message: 'No valide entry found for provided ID'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});


//----post----
router.post('/',(req, res, next) => {
    const film = new Film({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
    });

    film
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Film created successfully',
                createdFilm: {
                    _id: result._id,
                    name: result.name,
                    description: result.description,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/films/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    
});

//----put----
router.put('/:id',(req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Film.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Film updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/films/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//----delete----
router.delete('/:id',(req, res, next) => {
    const id = req.params.id;
    Film.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Film deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/films',
                    body: { name: 'String', description: 'String' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;