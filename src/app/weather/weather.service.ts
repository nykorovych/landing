import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, pluck, mergeMap, filter } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

interface OpenWeatherResponse {
  list: {
    dt_text: String;
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
  constructor(private http: HttpClient) {}

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
      })
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
    });
  }
  // EASY WAY WITHOUT RXJS
  // getCurrentLocation() {
  //   window.navigator.geolocation.getCurrentPosition((position) => {
  //     this.position = position;
  //     getForecastData();
  //   });
  // }
}
