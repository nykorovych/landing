import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor( weatherService: WeatherService) { weatherService.getForecast().subscribe((coords) => {console.log(coords)}) }

  ngOnInit(): void {
  }

}
