import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCityDisplayComponent } from './weather-city-display.component';

describe('WeatherCityDisplayComponent', () => {
  let component: WeatherCityDisplayComponent;
  let fixture: ComponentFixture<WeatherCityDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherCityDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCityDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
