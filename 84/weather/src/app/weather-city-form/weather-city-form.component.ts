import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherDataService } from '../shared/weather-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-city-form',
  templateUrl: './weather-city-form.component.html',
  styleUrls: ['./weather-city-form.component.css']
})
export class WeatherCityFormComponent implements OnInit, OnDestroy  {
  subscription: Subscription;
  weatherData;
  initialCity: string = 'london';
  initialUnits: string = 'imperial';

  constructor(private weatherDataService: WeatherDataService) { }

  ngOnInit() {
    this.getWeather(this.initialCity, this.initialUnits)
  }

  getWeather(city: string, units: string) {
    this.subscription = this.weatherDataService.getWeatherByCity(city, units)
      .subscribe(data => {
        this.weatherData = data;
      }, err => {
        this.weatherData = err;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
