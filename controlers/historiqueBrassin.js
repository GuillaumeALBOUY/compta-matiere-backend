const Brassin = require('../models/brassin');

exports.createBrassin = (req, res, next) => {
    console.log("demande de création " + " ** " + req.body.brassin.nom);
    const brassinObject = req.body.brassin;
    delete brassinObject._id;
    const brassin = new Brassin({
        ...brassinObject,
    });
    brassin.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllBrassins = (req, res, next) => {

    console.log('Recherche des brassins');
    Brassin.find({}).then(
        (brassin) => {
            res.status(200).json(brassin);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.injectionTest = (req, res, next) => {
    console.log('injection d une mp pour test');
    const brassin = new Brassin({
        nom: 'Biere dorée',
        date: new Date(2022, 11, 15),
        ref: 'azertyuiop',
    });
    brassin.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneBrassin = (req, res, next) => {
    console.log("Recherche de : " + req.params.ref);

    Brassin.findOne({
        ref: req.params.ref
    }).then(
        (brassin) => {
            console.log("Trouvé !");
            console.log(brassin);
            res.status(200).json(brassin);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};