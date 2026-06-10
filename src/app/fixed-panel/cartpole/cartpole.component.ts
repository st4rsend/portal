import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-cartpole',
    templateUrl: './cartpole.component.html',
    styleUrls: ['./cartpole.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CartpoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
