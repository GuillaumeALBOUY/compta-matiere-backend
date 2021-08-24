const express = require('express');
const router = express.Router();

const stockMPctrl = require('../controlers/stockMatierePremiere');


router.get('/', stockMPctrl.getAllMP);
//router.get('/test', stockMPctrl.testCalculAgrege);
router.get('/:ref', stockMPctrl.getOneMP);
router.post('/', stockMPctrl.createMP);
router.put('/:ref', stockMPctrl.updateMp);
router.get('/brassin/:ref', stockMPctrl.getMPbyBrassin);

module.exports = router;