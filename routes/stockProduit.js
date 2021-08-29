const express = require('express');
const router = express.Router();

const stockProduitctrl = require('../controlers/stockProduit');

router.get('/', stockProduitctrl.getAllProduit);
router.get('/test', stockProduitctrl.injectionTest);
router.get('/:ref', stockProduitctrl.getOneProduit);
router.post('/', stockProduitctrl.createProduit);
router.put('/:ref', stockProduitctrl.updateProduit);
router.get('/brassin/:ref', stockProduitctrl.getProduitbyBrassin);


module.exports = router;