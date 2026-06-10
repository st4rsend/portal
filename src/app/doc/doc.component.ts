import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-doc',
    templateUrl: './doc.component.html',
    styleUrls: ['./doc.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DocComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
