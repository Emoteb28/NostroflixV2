const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    films: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film'
    }]
});

module.exports = mongoose.model('Categorie', categorieSchema);