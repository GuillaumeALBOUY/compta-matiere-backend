const Matiere = require('../models/matiere');

exports.createMP = (req, res, next) => {
    console.log("demande de création " + " ** " + req.body.matiere.nom);
    const matiereObject = req.body.matiere;
    delete matiereObject._id;
    const matiere = new Matiere({
        ...matiereObject,
    });
    matiere.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}


exports.getOneMP = (req, res, next) => {
    console.log("Recherche de : " + req.params.ref);

    Matiere.findOne({
        ref: req.params.ref
    }).then(
        (matiere) => {
            console.log("Trouvé !");
            //console.log(matiere);
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

/*exports.getAllMP = (req, res, next) => {
    Matiere.find({}, { _id: 0, __v: 0, mouvements: 0 }).then(
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

};*/

exports.getAllMP = (req, res, next) => {
    Matiere.aggregate([{
        "$addFields": {
            "totalConso": {
                "$reduce": {
                    "input": "$mouvements",
                    "initialValue": 0,
                    "in": { "$add": ["$$value", "$$this.quantite"] }
                }
            }
        }
    },
    {
        '$project': {
            "mouvements": 0

        }
    }
    ]).exec((err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
            console.log(err);
        }
        else {
            res.status(200).json(data);
        }
    });
};

exports.updateMp = (req, res, next) => {
    Matiere.updateOne({ ref: req.params.ref }, { ...req.body.matiere })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.injectionTest = (req, res, next) => {
    console.log('injection d une mp pour test');
    const matiere = new Matiere({
        nom: 'T10',
        fournisseur: 'malterie de test',
        lot: 'gros',
        dlc: new Date(2022, 11, 15),
        qCommande: 25,
        mouvements: [{
            quantite: -5,
            date: new Date(2022, 11, 16),
            brassin: 'brassin de test'
        }]
    });
    matiere.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getMPbyBrassin = (req, res, next) => {

    console.log('Recherche de ' + req.params.ref);
    Matiere.find({
        "mouvements.brassin": req.params.ref
    }).then(
        (matieres) => {
            console.log("Trouvé !");
            console.log(matieres);
            res.status(200).json(matieres);
        }
    ).catch(error => res.status(400).json({ error }))

}