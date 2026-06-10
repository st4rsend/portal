import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-kaggle-survey',
    templateUrl: './kaggle-survey.component.html',
    styleUrls: ['./kaggle-survey.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class KaggleSurveyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
