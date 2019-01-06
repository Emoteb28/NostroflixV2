const Film = require('../models/film');
const Categorie = require('../models/categorie');

//---
const mongoose = require('mongoose');

module.exports = {
  getAll: async (req, res, next) => {
    Film.find()
        .select("_id name description categories")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                films: docs.map(doc => {
                  return {
                    _id: doc._id,
                    name: doc.name,
                    description: doc.description,
                    categories: doc.categories
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
    },
    getOne: async (req, res, next) => {
        const id = req.params.id;
        Film.findById(id)
            .select("_id name description categories")
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json({
                        film: doc
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
    },
    newFilm: async (req, res, next) => {
        const film = new Film({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            categories: req.body.categories
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
                        description: result.description
                    }
                });

                //-------
                result.categories.forEach(cat => {
                    Categorie.findByIdAndUpdate(cat._id,{
                        $push: { films: result }
                    })
                    .exec()
                    .then(data => {
                        console.log(data);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

            
    },
    updateFilm: async (req, res, next) => {
        const id = req.params.id;
        const updateOps = {};
        for(const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Film.update({_id: id}, { $set: updateOps})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Film updated'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    },
    deleteFilm: async (req, res, next) => {
        const id = req.params.id;
        Film.remove({_id: id})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Film deleted'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
  };