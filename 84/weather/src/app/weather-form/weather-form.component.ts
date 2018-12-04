import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherDataService } from '../shared/weather-data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit, OnDestroy {
  zipSubscription: Subscription;
  unitsSubscription: Subscription;
  urlSubscription: Subscription;
  weatherData;
  currentZip: string = '08701';
  currentUnits: string = 'imperial';
  currentUrl: string;

  constructor( 
    private router: Router,
    private service: WeatherDataService
  ) { }

  ngOnInit() {
      this.zipSubscription = this.service.getZip().subscribe(zip => {
        this.currentZip = zip;
        this.setParams(zip, this.currentUnits, this.currentUrl);
      });

      this.unitsSubscription = this.service.getUnits().subscribe(units => {
        this.currentUnits = units;
        this.setParams(this.currentZip, units, this.currentUrl);
      });

      this.urlSubscription = this.service.getUrl().subscribe(url => {
        this.currentUrl = url;
        this.setParams(this.currentZip, this.currentUnits, url);
      });
  }

  ngOnDestroy() {
    this.zipSubscription.unsubscribe();
    this.unitsSubscription.unsubscribe();
    this.urlSubscription.unsubscribe();
  }

  setParams(zip: string, units: string, url: string) {
    this.router.navigate([`/weather-by-zip/${url}/${zip}/${units}`]);
    this.service.setZip(zip);
    this.service.setUnits(units);
  }

  routerLinkNavigation(url: string) {
    this.router.navigate([`/weather-by-zip/${url}/${this.currentZip}/${this.currentUnits}`]);
  }

}
