const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

app.listen(8000);

console.log('Blog Server Listing!');

mongoose.connect('mongodb://blogger:linda1@ds241570.mlab.com:41570/linda-blog', {useNewUrlParser: true});

const Article = mongoose.model('Article', {
  date: Date,
  title: String,
  body: String
})

function getArticles () {
  return Article.find().exec();
	// return Promise.resolve(articles);
}

function getArticle(id) {
  return Article.findById(id).exec();
  // var article = articles.find(a => a._id==id);
	// return Promise.resolve(article);
}

function saveArticle(article) {
  if(!article._id) article = new Article(article);
  return Article.findByIdAndUpdate(article._id, article, {upsert:true, new:true}).exec();
  // var foundArticle = articles.find(a => a._id==article._id);
  // if(foundArticle) {
      // foundArticle.title = article.title;
      // foundArticle.body = article.body;
      // foundArticle.date = article.date;
  // } else {
    // article._id=articles.length+1;
    // articles.push(article);
  // }
  // return Promise.resolve(article);
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