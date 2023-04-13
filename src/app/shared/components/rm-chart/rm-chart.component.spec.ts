import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RMChartComponent } from './rm-chart.component';

describe('RMChartComponent', () => {
  let component: RMChartComponent;
  let fixture: ComponentFixture<RMChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RMChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RMChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
