const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const port = +process.env.PORT || 8000; 

app.listen(port);

console.log('Blog Server Listing! on port', port);
app.use('/', express.static('./client/dist/articles'));

mongoose.connect('mongodb://blogger:linda1@ds241570.mlab.com:41570/linda-blog', {useNewUrlParser: true});

const Article = mongoose.model('Article', {
  date: Date,
  title: String,
  body: String
})

function getArticles () {
  return Article.find().sort( {date: -1} ).exec();
}

function getArticle(id) {
  return Article.findById(id).exec();
}

function saveArticle(article) {
  if(!article._id) article = new Article(article);
  return Article.findByIdAndUpdate(article._id, article, {upsert:true, new:true}).exec();
};

app.get('/api/articles', (req,res) => {
	getArticles().then(articles => {
		res.json(articles);
	})
});

app.get('/api/articles/:id', (req,res) => {
	getArticle(req.params.id).then(article => {
		res.json(article);
	})
});

app.post('/api/article', (req,res) => {
	saveArticle(req.body).then(article => {
		res.json(article);
	})
});
