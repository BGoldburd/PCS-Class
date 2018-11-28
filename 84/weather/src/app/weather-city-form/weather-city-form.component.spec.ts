import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCityFormComponent } from './weather-city-form.component';

describe('WeatherCityFormComponent', () => {
  let component: WeatherCityFormComponent;
  let fixture: ComponentFixture<WeatherCityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherCityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
