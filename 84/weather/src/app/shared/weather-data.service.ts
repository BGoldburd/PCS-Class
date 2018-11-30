import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  currentZip: BehaviorSubject<string> = new BehaviorSubject('08701');
  currentUnits: BehaviorSubject<string> = new BehaviorSubject('imperial');

  constructor(private httpClient: HttpClient) { }

  getWeatherByZip(zip: string, units: string) {
    return this.httpClient.get(`http://api.openweathermap.org/data/2.5/weather?APPID=cb7c71219cf09eb0bb414b932669be97&zip=${zip}&units=${units}`);
  }

  getFiveDayByZip(zip: string, units: string) {
    return this.httpClient.get(`http://api.openweathermap.org/data/2.5/forecast?APPID=cb7c71219cf09eb0bb414b932669be97&zip=${zip}&units=${units}`);
  }

  getWeatherByCity(city: string, units: string) {
    return this.httpClient.get(`http://api.openweathermap.org/data/2.5/weather?APPID=cb7c71219cf09eb0bb414b932669be97&q=${city}&units=${units}`);
  }

  getZip(): Observable<string> {
    return this.currentZip.asObservable();
  }

  getUnits(): Observable<string> {
    return this.currentUnits.asObservable();
  }

  setZip(zip: string) {
    if (zip !== this.currentZip.value) {
      this.currentZip.next(zip);
    }
  }

  setUnits(units: string) {
    if (units !== this.currentUnits.value) {
      this.currentUnits.next(units);
    }
  }
}
