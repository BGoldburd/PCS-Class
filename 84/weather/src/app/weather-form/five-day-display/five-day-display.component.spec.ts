import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayDisplayComponent } from './five-day-display.component';

describe('FiveDayDisplayComponent', () => {
  let component: FiveDayDisplayComponent;
  let fixture: ComponentFixture<FiveDayDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveDayDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
