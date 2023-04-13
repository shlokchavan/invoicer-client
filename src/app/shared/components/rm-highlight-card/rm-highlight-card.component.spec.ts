import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmHighlightCardComponent } from './rm-highlight-card.component';

describe('RmHighlightCardComponent', () => {
  let component: RmHighlightCardComponent;
  let fixture: ComponentFixture<RmHighlightCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmHighlightCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmHighlightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
