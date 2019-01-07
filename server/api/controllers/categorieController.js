const Categorie = require('../models/categorie');
const Film = require('../models/film');

//---
const mongoose = require('mongoose');

module.exports = {
  getAll: async (req, res, next) => {
    await Categorie.find()
        .select("_id name description films")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                categories: docs.map(doc => {
                  return {
                    _id: doc._id,
                    name: doc.name,
                    description: doc.description,
                    films: doc.films
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
        await Categorie.findById(id)
            .populate('films','_id name description')
            .select("_id name description films")
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json({
                        categorie: doc
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
    newCategorie: async (req, res, next) => {
        const categorie = new Categorie({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            films: []
        });
    
        await categorie
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Categorie created successfully',
                    createdCategorie: {
                        _id: result._id,
                        name: result.name,
                        description: result.description
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    },
    updateCategorie: async (req, res, next) => {
        const oldCategorie = await Categorie.findById(req.params.id);

        await Categorie.findByIdAndUpdate(req.params.id, req.body)
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Categorie updated'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

        const newCategorie = await Categorie.findById(req.params.id);
        
        //----------
        for(const element of newCategorie.films){
            const film = await Film.findById(element._id);
            const categorie = film.categories.indexOf(oldCategorie);
            film.categories[categorie] = newCategorie;
            await film.save();
        }
    },
    deleteCategorie: async (req, res, next) => {
        const categorie = await Categorie.findById(req.params.id);
        await Categorie.findByIdAndRemove(req.params.id)
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Categorie deleted',
                    deletedCategorie: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

        //----------
         for(const element of categorie.films){
            const film = await Film.findById(element._id);
            film.categories.pull(categorie);
            await film.save();
        }
    }
  };