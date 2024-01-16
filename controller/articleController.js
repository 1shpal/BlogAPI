
const Article = require('../model/article.model');
const Category = require('../model/category.model');

exports.createArticle = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // Check if the title is already taken
    const existingArticle = await Article.findOne({ title });
    if (existingArticle) {
      return res.status(400).json({ error: 'An article with the same title already exists.' });
    }

    // Create a new article
    const article = new Article({ title, description, category });

    // Save the article to the database
    await article.save();

    return res.status(201).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getAllArticles = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // If search term is provided, use it to filter articles
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [{ title: searchRegex }, { description: searchRegex }];
    }

    const articles = await Article.find(query).sort({ createdAt: -1 }).populate('category');
    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editArticle = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const articleId = req.params.id;

    // Check if the article exists
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    // Check if the new title is unique (optional, based on your requirements)
    if (title !== article.title) {
      const existingArticle = await Article.findOne({ title });
      if (existingArticle) {
        return res.status(400).json({ error: 'An article with the same title already exists.' });
      }
    }

    // Update the article using findByIdAndUpdate
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { title, description, category },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedArticle);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteArticle = async (req, res) => {
    try {
      const articleId = req.params.id;
  
      // Check if the article exists
      const article = await Article.findById(articleId);
      if (!article) {
        return res.status(404).json({ error: 'Article not found.' });
      }
  
      // Delete the article
      await Article.deleteOne({ _id: articleId });
  
      return res.status(200).json({ message: 'Article deleted successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
