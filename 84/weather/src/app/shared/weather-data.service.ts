import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private httpClient: HttpClient) { }

  getWeatherByZip(zip: string, units: string) {
    return this.httpClient.get(`http://api.openweathermap.org/data/2.5/weather?APPID=cb7c71219cf09eb0bb414b932669be97&zip=${zip}&units=${units}`);
  }

  getWeatherByCity(city: string, units: string) {
    return this.httpClient.get(`http://api.openweathermap.org/data/2.5/weather?APPID=cb7c71219cf09eb0bb414b932669be97&q=${city}&units=${units}`);
  }
}
