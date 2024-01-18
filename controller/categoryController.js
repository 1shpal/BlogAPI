
const Category = require('../model/category.model');
const { validationResult } = require('express-validator');
exports.createCategory = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;


    const category = new Category({ name });

    await category.save();

    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

