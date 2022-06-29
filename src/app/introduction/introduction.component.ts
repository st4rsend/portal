import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.sass']
})
export class IntroductionComponent implements OnInit {

  constructor(private globalService: GlobalService) {
		this.globalService.displayWish = true;
		this.globalService.addPanelItems("cartpole", false);
	}

  ngOnInit(): void {
	}
}
