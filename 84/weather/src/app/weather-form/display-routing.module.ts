import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { WeatherFormComponent } from './weather-form.component';
import { FiveDayDisplayComponent } from './five-day-display/five-day-display.component';

export const displayRoutes: Routes = [
  { path: 'weather-by-zip',
    component: WeatherFormComponent,
    children: [
      {
        path: 'current/:zip/:units', 
        component: WeatherDisplayComponent
      },
      {
        path: 'five-day/:zip/:units',
        component: FiveDayDisplayComponent
      }
    ] 
     
  }
];

@NgModule({
  imports: [ RouterModule.forChild(displayRoutes) ],
  exports: [ RouterModule ]
})
export class DisplayRoutingModule { }
