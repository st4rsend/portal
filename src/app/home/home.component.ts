import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass'],
    standalone: false
})

export class HomeComponent implements OnInit {

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
