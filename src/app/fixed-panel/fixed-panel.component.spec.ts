import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedPanelComponent } from './fixed-panel.component';

describe('FixedPanelComponent', () => {
  let component: FixedPanelComponent;
  let fixture: ComponentFixture<FixedPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
