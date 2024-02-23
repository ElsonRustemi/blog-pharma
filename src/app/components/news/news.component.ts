import { Component, OnInit } from '@angular/core';
import { HealthNewsService } from 'src/app/services/health-news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  healthNewsArr: any [];

  constructor(private healthNews: HealthNewsService) { }

  ngOnInit(): void {
    this.getAllHealthNews();
  }

  async getAllHealthNews() {
    try {
      this.healthNewsArr = [];
      const data = await this.healthNews.getHeathNews().toPromise();
      console.log(data);
      data.articles.map(element => {
        if(element.content !== '[Removed]') {
          this.healthNewsArr.push(element);
        } else {
          return
        }
      })
      // this.healthNewsArr = data.articles;
    } catch (error) {
      console.error(error);
    }
  }

}
