const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    }]
});

module.exports = mongoose.model('Film', filmSchema);