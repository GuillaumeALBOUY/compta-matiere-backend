const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mpRoute = require('./routes/stockMatierePremiere');
const brassinRoute = require('./routes/historiqueBrassin');
const produitRoute = require('./routes/stockProduit')

const app = express();

mongoose.connect('mongodb+srv://user_test:useruser@cluster0.0inyw.mongodb.net/comptaMatiere?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use((req,res,next) => {
    console.log('Bon début');
    next();
});

app.use(bodyParser.json());

app.use('/api/stockmp', mpRoute);
app.use('/api/histobrassin', brassinRoute);
app.use('/api/stockproduit', produitRoute);

module.exports = app;

