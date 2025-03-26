import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatexComponent } from './katex.component';

describe('KatexComponent', () => {
  let component: KatexComponent;
  let fixture: ComponentFixture<KatexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KatexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KatexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
