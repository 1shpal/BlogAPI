
const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');


router.post('/add', categoryController.createCategory);


router.get('/list', categoryController.getAllCategories);


module.exports = router;
