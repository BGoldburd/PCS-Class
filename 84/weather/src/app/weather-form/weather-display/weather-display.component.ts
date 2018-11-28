import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WeatherDataService } from 'src/app/shared/weather-data.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {
  myZip;
  weatherData;

  constructor(
    private route: ActivatedRoute,
    private service: WeatherDataService
  ) {}

  ngOnInit() {
    this.myZip = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getWeatherByZip(params.get('zip'), params.get('units')))
    ).subscribe(data => {
      this.weatherData = data;
    }, err => {
    this.weatherData = err;
    });
  }
  
  // @Input()
  // weatherData;

}
