const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String
});

module.exports = mongoose.model('Categorie', categorieSchema);