const express = require('express');
const router = express.Router();
const controllerProducts = require('../controller/products');

router.get('/byCategory', controllerProducts.getByCategory);

module.exports = router; 