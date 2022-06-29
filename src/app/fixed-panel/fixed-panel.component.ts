import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-fixed-panel',
  templateUrl: './fixed-panel.component.html',
  styleUrls: ['./fixed-panel.component.sass']
})
export class FixedPanelComponent implements OnInit {

	public cartpole: boolean=false; 
	public nextapp: boolean=false; 

	panelItemsSub$: Subscription;
	public panelItemsList: boolean[]=[];

  constructor(private globalService: GlobalService) { 
		this.panelItemsSub$ = this.globalService.panelItems$.subscribe(
			value => { this.parseMap(value); });
	}

	parseMap(value: any) {
		// cartpole
		let key: string="cartpole";
		if (value.get(key)) {
				this.cartpole = value.get(key).value;
		}
		// nextapp
		key = "nextapp";
		if (value.get(key)) {
				this.nextapp = value.get(key).value;
		}

	}

  ngOnInit(): void {
  }

}
