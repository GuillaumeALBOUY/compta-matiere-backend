const express = require('express');
const router = express.Router();

const histoBrassinCtrl = require('../controlers/historiqueBrassin');


router.get('/', histoBrassinCtrl.getAllBrassins);
router.get('/test', histoBrassinCtrl.injectionTest);
router.get('/:ref', histoBrassinCtrl.getOneBrassin);
router.post('/', histoBrassinCtrl.createBrassin);
//router.put('/:ref', histoBrassinCtrl.updateMp);

module.exports = router;