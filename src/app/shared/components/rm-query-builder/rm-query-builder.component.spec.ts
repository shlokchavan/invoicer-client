import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmQueryBuilderComponent } from './rm-query-builder.component';

describe('RmQueryBuilderComponent', () => {
  let component: RmQueryBuilderComponent;
  let fixture: ComponentFixture<RmQueryBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmQueryBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmQueryBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
