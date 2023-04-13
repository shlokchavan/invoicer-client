import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmPicklistComponent } from './rm-picklist.component';

describe('RmPicklistComponent', () => {
  let component: RmPicklistComponent;
  let fixture: ComponentFixture<RmPicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmPicklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmPicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
