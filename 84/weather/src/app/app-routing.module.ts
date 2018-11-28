import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WeatherCityFormComponent } from './weather-city-form/weather-city-form.component';
import { DisplayRoutingModule } from './weather-form/display-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'weather-by-zip',
    pathMatch: 'full'
  },
  // {
  //   path: 'weather-by-zip',
  //   component: WeatherFormComponent
  // },
  {
    path: 'weather-by-city',
    component: WeatherCityFormComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DisplayRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
