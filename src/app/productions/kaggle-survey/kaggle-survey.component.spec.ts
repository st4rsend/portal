import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaggleSurveyComponent } from './kaggle-survey.component';

describe('KaggleSurveyComponent', () => {
  let component: KaggleSurveyComponent;
  let fixture: ComponentFixture<KaggleSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaggleSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaggleSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
