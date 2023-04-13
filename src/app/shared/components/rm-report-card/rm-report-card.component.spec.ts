import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmReportCardComponent } from './rm-report-card.component';

describe('RmReportCardComponent', () => {
  let component: RmReportCardComponent;
  let fixture: ComponentFixture<RmReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmReportCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
