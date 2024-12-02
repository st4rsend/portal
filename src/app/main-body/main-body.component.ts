import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { GlobalService } from '../global.service';

@Component({
    selector: 'app-main-body',
    templateUrl: './main-body.component.html',
    styleUrls: ['./main-body.component.sass'],
    standalone: false
})

export class MainBodyComponent {

	panelSub$: Subscription;
	public panelDisplay: boolean=true;

  constructor(private globalService: GlobalService) {
		this.panelSub$ = this.globalService.getDisplayPanel().subscribe(
			value => { this.panelDisplay = value;});
	}
}
