const mongoose = require('mongoose');

const produitSchema = mongoose.Schema({
    nom: { type: String, required: true},
    abv: { type: Number, required: true},
    ref: { type: String, required: true, unique: true },
    brassin: { type: String, required: true},
    conditionnement: { type: Number, required: true},
    mouvements: [{
      date: { type: Date, required: true},
      quantite: { type: Number, required: true},
      motif : { type: String, required: true}
    }]
  })

module.exports = mongoose.model('Produit', produitSchema); 