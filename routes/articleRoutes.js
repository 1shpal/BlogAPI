
const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');

router.post('/add', articleController.createArticle);
router.get('/list', articleController.getAllArticles);
router.put('/edit/:id', articleController.editArticle);
router.delete('/delete/:id', articleController.deleteArticle);


module.exports = router;
