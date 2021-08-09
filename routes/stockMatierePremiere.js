const express = require('express');
const router = express.Router();

const stockMPctrl = require('../controlers/stockMatierePremiere');


router.get('/', stockMPctrl.getAllMP);
//router.get('/test', stockMPctrl.injectionTest);
router.get('/:name', stockMPctrl.getOneMP);

module.exports = router;