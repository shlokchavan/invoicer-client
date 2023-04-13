import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RMCalendarComponent } from './rm-calendar.component';

describe('RMCalendarComponent', () => {
  let component: RMCalendarComponent;
  let fixture: ComponentFixture<RMCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RMCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RMCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
