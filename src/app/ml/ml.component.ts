import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-ml',
  templateUrl: './ml.component.html',
  styleUrls: ['./ml.component.sass']
})
export class MlComponent implements OnInit {

	public linkType: boolean = false;

  constructor(private globalService: GlobalService) { 
		this.globalService.displayWish = false;
	}

  ngOnInit(): void {
  }

	linkTypeChange(): void {
		console.log(this.linkType);
	}

}
