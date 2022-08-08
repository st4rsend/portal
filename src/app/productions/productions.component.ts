import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { GlobalService } from '../global.service';

@Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.sass']
})
export class ProductionsComponent implements OnInit {

	public linkType: boolean = false;
	public content = false;
	public ml = false;

  constructor(private globalService: GlobalService) { 
		this.globalService.displayWish = false;
	}

  ngOnInit(): void {
  }

	linkTypeChange(): void {
		console.log(this.linkType);
	}

	contenuClick(): void {
		this.content = !this.content;
	}

	mlClick(): void {
		this.ml = ! this.ml;
	}
}
