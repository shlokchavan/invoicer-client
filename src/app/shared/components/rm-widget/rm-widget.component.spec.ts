import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmWidgetComponent } from './rm-widget.component';

describe('RmWidgetComponent', () => {
  let component: RmWidgetComponent;
  let fixture: ComponentFixture<RmWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
