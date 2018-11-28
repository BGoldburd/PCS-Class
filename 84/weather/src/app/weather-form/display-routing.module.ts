import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { WeatherFormComponent } from './weather-form.component';

export const displayRoutes: Routes = [
  { path: 'weather-by-zip',
    component: WeatherFormComponent,
    children: [
      {path: 'current/:zip/:units', component: WeatherDisplayComponent}
    ] 
     
  }
];

@NgModule({
  imports: [ RouterModule.forChild(displayRoutes) ],
  exports: [ RouterModule ]
})
export class DisplayRoutingModule { }
