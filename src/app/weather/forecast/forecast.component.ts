import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  forecast$: Observable<{dataString: String, temp: number}[]>;

  constructor(private weatherService: WeatherService) {
    this.forecast$ = this.weatherService.getForecast();
  }

  ngOnInit(): void {}
}
