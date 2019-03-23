const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.listen(8000);

console.log('Articles listening at http://localhost:8000');

const articles = [{
  _id: 1,
  date: new Date(),
  title: 'My first post!',			// title shows up on the ArticleList
  body: 'Lorem ipsum.'				// body is only for the ArticleDetail
},{
  _id: 2,
  date: new Date(),
  title: 'My second post!',
  body: 'Lorem ipsum, lorem ipsum.'
},{
  _id: 3,
  date: new Date(),
  title: 'More of my ramblings',
  body: 'Lorem ipsum.  Lorem ipsum, lorem ipsum.'
}];



app.get('/api/articles',(req,res) => {
	res.json(articles);
});

app.get('/api/article/:id',(req,res) => {
	res.json(article);
});