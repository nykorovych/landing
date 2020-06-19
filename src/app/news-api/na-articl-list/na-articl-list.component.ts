import { Component, OnInit } from '@angular/core';
import { NewsApiModule } from '../news-api.module';
import { NewsApiService } from '../news-api.service';
import { Article} from '../news-api.service'

@Component({
  selector: 'app-na-articl-list',
  templateUrl: './na-articl-list.component.html',
  styleUrls: ['./na-articl-list.component.css']
})
export class NaArticlListComponent implements OnInit {
  articles: Article[]
  constructor(private newsApiService: NewsApiService) { 
    this.newsApiService.pagesOutput.subscribe((articles) => {
      this.articles = articles
      // this.newsApiService.getPages(1)
    })
  }

  ngOnInit(): void {
    this.newsApiService.getPages(1)
  }

  

}
