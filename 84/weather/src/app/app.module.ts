import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import { WeatherDisplayComponent } from './weather-form/weather-display/weather-display.component';
import { WeatherCityFormComponent } from './weather-city-form/weather-city-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WeatherCityDisplayComponent } from './weather-city-form/weather-city-display/weather-city-display.component';
import { FiveDayDisplayComponent } from './weather-form/five-day-display/five-day-display.component';
import { DisplayRoutingModule } from './weather-form/display-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    WeatherFormComponent,
    WeatherDisplayComponent,
    WeatherCityFormComponent,
    PageNotFoundComponent,
    WeatherCityDisplayComponent,
    FiveDayDisplayComponent
  ],
  imports: [
    BrowserModule,
    DisplayRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
