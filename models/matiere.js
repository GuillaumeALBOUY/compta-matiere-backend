const mongoose = require('mongoose');

const matiereSchema = mongoose.Schema({
  nom: { type: String, required: true },
  fournisseur: { type: String, required: true },
  lot: { type: String, required: true },
  dlc: { type: Date, required: true},
  qCommande: { type: Number, required: true },
  mouvements : [{ 
    quantite : {type : Number, required: true},
    date : {type : Date, required: true},
    brassin : String
   }]
});

module.exports = mongoose.model('Matiere', matiereSchema);