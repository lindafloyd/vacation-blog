import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';


@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent {
  
  article = {};

  constructor(private route:ActivatedRoute, private router:Router, private articleService:ArticleService) {
    var id = route.snapshot.paramMap.get('id');
    console.log('ArticleEditComponent id=%o', id);
    console.log(this.article);
    if(id==="new"){
      this.article={
        name:'',
        title:'',
        date:'',
        article:''
      }
    } else {
    this.articleService.getArticle(id).then(article => {
        this.article = article;
    });
  }
  
  }

  parseDate(str) {
    return new Date(str);
  }

  save() {
    this.articleService.saveArticle(this.article).then(articles => {
      this.router.navigate(['/articles']);
  });
 }   
} 

