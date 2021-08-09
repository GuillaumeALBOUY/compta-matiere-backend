const matiere = require('../models/matiere');
const Matiere = require('../models/matiere');


exports.getOneMP = (req, res, next) => {
    console.log("Recherche de : " + req.params.name);

    Matiere.findOne({
        nom: req.params.name
    }).then(
        (matiere) => {
            console.log("Trouvé !");
            console.log(matiere);
            res.status(200).json(matiere);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getAllMP = (req, res, next) => {
    Matiere.find().then(
        (matiere) => {
            res.status(200).json(matiere);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );

};

exports.injectionTest = (req, res, next) => {
    console.log('injection d une mp pour test');
    const matiere = new Matiere({
        nom: 'T10',
        fournisseur: 'malterie de test',
        lot: 'gros',
        dlc: new Date(2022, 11, 15),
        qCommande: 25,
    });
    matiere.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };