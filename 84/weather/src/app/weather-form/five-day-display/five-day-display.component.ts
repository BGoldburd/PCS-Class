import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WeatherDataService } from 'src/app/shared/weather-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-five-day-display',
  templateUrl: './five-day-display.component.html',
  styleUrls: ['./five-day-display.component.css']
})
export class FiveDayDisplayComponent implements OnInit {
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
        return this.service.getFiveDayByZip(params.get('zip'), params.get('units'))})        
    ).subscribe(data => {
      this.weatherData = data;
      console.log(data);
    }, err => {
    this.weatherData = err;
    });

    this.service.setUrl('five-day');
  }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
