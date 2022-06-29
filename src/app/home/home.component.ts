import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  constructor(private globalService: GlobalService) { 
		this.globalService.displayWish = true;
		this.globalService.addPanelItems("cartpole", true);
	}

  ngOnInit(): void {
  }
	
}
