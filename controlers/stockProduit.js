const Produit = require('../models/produit');

exports.createProduit = (req, res, next) => {
    console.log("demande de création " + " ** " + req.body.produit.nom);
    const produitObject = req.body.produit;
    delete produitObject._id;
    const produit = new Produit({
        ...produitObject,
    });
    produit.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneProduit = (req, res, next) => {
    console.log("Recherche de : " + req.params.ref);

    Produit.findOne({
        ref: req.params.ref
    }).then(
        (produit) => {
            console.log("Trouvé !");
            //console.log(produit);
            res.status(200).json(produit);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getProduitbyBrassin = (req, res, next) => {
    console.log("Recherche de : " + req.params.ref);

    Produit.find({
        brassin: req.params.ref
    }).then(
        (produit) => {
            console.log("Trouvé !");
            console.log(produit);
            res.status(200).json(produit);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.getAllProduit = (req, res, next) => {
    console.log('Récupération de tous les produits');
    Produit.aggregate([{
        "$addFields": {
            "totalStock": {
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

exports.updateProduit = (req, res, next) => {
    console.log('Modification du produit '+req.params.ref);
    Produit.updateOne({ ref: req.params.ref }, { ...req.body.produit })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.injectionTest = (req, res, next) => {
    console.log('injection d un produit pour test');
    const produit = new Produit({
        nom: 'Biere dorée',
        abv: 70,
        ref: 'Bieredoreedetests',
        brassin: 'stout1629794276229',
        conditionnement: 33,
        mouvements: [{
          date: new Date(2022, 11, 15),
          quantite: 200,
          motif : 'mise en bouteille'
        }]
    });
    produit.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};