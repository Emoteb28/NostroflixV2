const express = require('express');
const app = express();

const filmsRoutes = require('./api/routes/films');
const categoriesRoutes = require('./api/routes/categories');

app.use('/films', filmsRoutes);
app.use('/categories', categoriesRoutes);


module.exports = app;