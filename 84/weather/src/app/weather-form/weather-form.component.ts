import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherDataService } from '../shared/weather-data.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {
  subscription: Subscription;
  weatherData;
  initialZip: string = '08701';
  initialUnits: string = 'imperial';

  constructor( 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.setZip(this.initialZip, this.initialUnits);
  }

  setZip(zip: string, units: string) {
    this.router.navigate([`/weather-by-zip/current/${zip}/${units}`]);
  }
  
  
  
  
  
  // constructor(private weatherDataService: WeatherDataService) { }

  // ngOnInit() {
  //   this.getWeather(this.initialZip, this.initialUnits)
  // }

  // getWeather(zip: string, units: string) {
  //   this.subscription = this.weatherDataService.getWeatherByZip(zip, units)
  //     .subscribe(data => {
  //       this.weatherData = data;
  //     }, err => {
  //       this.weatherData = err;
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

}
