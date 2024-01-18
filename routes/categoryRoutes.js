
const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const { body } = require('express-validator');

router.post('/add', [body('name').notEmpty().withMessage('name cannot be empty')], categoryController.createCategory);


router.get('/list', categoryController.getAllCategories);


module.exports = router;
