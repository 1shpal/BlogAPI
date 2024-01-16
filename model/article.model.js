const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
  title:
   { 
    type: String,
     required: true 
    },
  description:
   {
     type: String,
     required: true 
    },
  category: 
  {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Category', 
     required: true 
    },
  slug: 
  {
     type: String, 
    required: true,
     unique: true
     },
  createdAt: 
  {
     type: Date,
     default: Date.now
    
    },
});

articleSchema.pre('validate', function (next) {
 
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
