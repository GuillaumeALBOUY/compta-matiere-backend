const mongoose = require('mongoose');

const matiereSchema = mongoose.Schema({
  type: { type: String},
  nom: { type: String, required: true },
  ref: { type: String, required: true, unique: true },
  fournisseur: { type: String, required: true },
  lot: { type: String, required: true },
  dlc: { type: Date, required: true},
  qCommande: { type: Number, required: true },
  archive: { type: Boolean},
  mouvements : [{ 
    quantite : {type : Number, required: true},
    date : {type : Date, required: true},
    motif : String,
    brassin : String
   }]
});


module.exports = mongoose.model('Matiere', matiereSchema);