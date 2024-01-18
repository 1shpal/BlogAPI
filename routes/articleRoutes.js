
const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');
const { body } = require('express-validator');

const articleVaidator =[
    body('title').notEmpty().withMessage('Title cannot be empty'),
    body('description').notEmpty().withMessage('Description cannot be empty'),
    body('category').notEmpty().withMessage('Category cannot be empty'),
  ]



  
router.post('/add',articleVaidator, articleController.createArticle);

router.get('/list', articleController.getAllArticles);

router.put('/edit/:id',articleVaidator, articleController.editArticle);
router.delete('/delete/:id', articleController.deleteArticle);


module.exports = router;
