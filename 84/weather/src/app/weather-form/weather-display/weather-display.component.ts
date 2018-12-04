import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WeatherDataService } from 'src/app/shared/weather-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {
  subscription: Subscription;
  weatherData;

  constructor(
    private route: ActivatedRoute,
    private service: WeatherDataService
  ) {}

  ngOnInit() {
    this.subscription = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.service.setZip(params.get('zip'));
        this.service.setUnits(params.get('units'));
        return this.service.getWeatherByZip(params.get('zip'), params.get('units'))})        
    ).subscribe(data => {
      this.weatherData = data;
    }, err => {
    this.weatherData = err;
    });
    
    this.service.setUrl('current');
  }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
