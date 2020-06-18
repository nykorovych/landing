import { Injectable } from '@angular/core';
// throwError - from rxjs --> returns a new observable
// catchError - rxjs/operatios --> just got some value transforms it and spits new value (transformational operators)
import { Observable, of, throwError } from 'rxjs';
import {
  map,
  switchMap,
  pluck,
  mergeMap,
  filter,
  toArray,
  share,
  tap,
  catchError,
  retry,
} from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResponse {
  list: {
    dt_txt: String;
    main: {
      temp: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getForecast() {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'metric')
          .set('appid', '548577759080913bd53fbbb74729cb19');
      }),
      switchMap((params) =>
        this.http.get<OpenWeatherResponse>(this.url, { params })
      ),
      pluck('list'),
      mergeMap((value) => of(...value)),
      filter((value, index) => {
        return index % 8 === 0;
      }),
      map((value) => {
        return {
          dataString: value.dt_txt,
          temp: value.main.temp,
        };
      }),
      toArray(),
      share()
      // map((value:any) => {
      //   return value.list.map((listObj, index) => {
      //     const {main, dt_txt } = listObj
      //     //  return [main.temp, dt_txt, ]
      //      return { tem: main.temp, dt_txt, index}
      //   }).filter((record, index) => index % 8 === 0)
      // })
      // switchMap(newparams => this.http.get<any>(this.url + "?" + newparams  ))
      // map((res)=> {
      //  return res.list.filter().map()
      // })
    );
  }

  getCurrentLocation() {
    return new Observable<Coordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (res) => {
          observer.next(res.coords);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );

      // Your API key is: 44a854579b274cee89bc523d4d61dcba
    }).pipe(
      retry(2),
      // tap operetor get get 3 arguments (next?: (x: Coordinates) => void, error?: (e: any) => void, complete?: () => void)
      tap(
        () => {
          this.notificationsService.addSuccess('Got location');
        }
        // !!! peope just dont know that tap takes the second, third arguments :-)
        // () => {
        //   this.notificationsService.addError('Failed to get location');
        // }
      ),
      catchError((err) => {
        // 1# handle the err
        // -----------can add some default coordinats...

        this.notificationsService.addError('You are an idiol GLICK ALLOW');

        // 2# return a NEW observable
        // can do like return new Observable(observer => { observer.error(err)})

        return throwError(err);
      })
    );
  }
  // EASY WAY WITHOUT RXJS
  // getCurrentLocation() {
  //   window.navigator.geolocation.getCurrentPosition((position) => {
  //     this.position = position;
  //     getForecastData();
  //   });
  // }
}
