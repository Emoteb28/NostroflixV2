const Film = require('../models/film');
const Categorie = require('../models/categorie');

//---
const mongoose = require('mongoose');

module.exports = {
  getAll: async (req, res, next) => {
    await Film.find()
        .populate('categories','_id name description')
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
        await Film.findById(id)
            .populate('categories','_id name description')
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
    
        await film
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
        const oldFilm = await Film.findById(req.params.id);

        await Film.findByIdAndUpdate(req.params.id, req.body)
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

        const newFilm = await Film.findById(req.params.id);

        //----------
        for(const element of newFilm.categories){
            const categorie = await Categorie.findById(element._id);
            const film = categorie.films.indexOf(oldFilm);
            categorie.films[film] = newFilm;
            await categorie.save();
        }
    },
    deleteFilm: async (req, res, next) => {
        const film = await Film.findById(req.params.id);
        await Film.findByIdAndRemove(req.params.id)
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Film deleted',
                    deletedFilm: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
            //-----
            for(const element of film.categories){
                const categorie = await Categorie.findById(element._id);
                categorie.films.pull(film);
                await categorie.save();
            }
    }
  };