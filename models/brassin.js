const mongoose = require('mongoose');

const brassinSchema = mongoose.Schema({
    nom: { type: String, required: true},
    date: { type: Date, required: true},
    ref: { type: String, required: true, unique: true },
  })

module.exports = mongoose.model('Brassin', brassinSchema); 