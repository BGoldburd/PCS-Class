import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-city-display',
  templateUrl: './weather-city-display.component.html',
  styleUrls: ['./weather-city-display.component.css']
})
export class WeatherCityDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  @Input()
  weatherData;

}
