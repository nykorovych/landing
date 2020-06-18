import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '44a854579b274cee89bc523d4d61dcba';
  private country = 'us';

  pagesInput: Subject<number>;
  pagesOutput: Observable<any>;
  numberOfPages: Observable<any>;

  constructor() {
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map(page => {
        return new HttpParams()
        .set('apiKey', this.apiKey)
        .set('coutry', this.country)
        .set('pageSize', String(this.pageSize))
        .set('page', String(page))
      })
    );
  }
}
