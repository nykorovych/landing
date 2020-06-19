import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, switchMap, tap, pluck } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

interface Article {
  title: string;
  url: string;
}
interface NewApiResponse {
  totalResult: number;
  articles: Article[];
}
@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '44a854579b274cee89bc523d4d61dcba';
  private country = 'us';

  private pagesInput: Subject<number>;
  pagesOutput: Observable<Article[]>;
  numberOfPages: Subject<any>;

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject();
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey', this.apiKey)
          .set('coutry', this.country)
          .set('pageSize', String(this.pageSize))
          .set('page', String(page));
      }),
      switchMap((params) => {
        return this.http.get<NewApiResponse>(this.url, { params });
      }),
      tap((response) => {
        const totalePages = Math.ceil(response.totalResult / this.pageSize);
        // 55 / 10 = 5.5 --> 6 (Math.ceil())
        this.numberOfPages.next(totalePages);
      }),
      pluck('acticles')
    );
  }

  getPages(page) {
    this.pagesInput.next(page);
  }
}
