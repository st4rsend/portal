import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.sass']
})
export class IntroductionComponent implements OnInit {

	private sub: any;

	public appTheme: string="light-theme";

  constructor(
			private route: ActivatedRoute,
			private globalService: GlobalService) {
		this.globalService.displayWish = true;
		this.globalService.addPanelItems("cartpole", false);
	}

  ngOnInit(): void {
		this.sub = this.route.params.subscribe(params => {
			this.appTheme = params['theme'];
		});
	}
}
