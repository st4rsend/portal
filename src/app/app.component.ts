import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

	constructor(
				private router: Router,
				private window: Window,
				private globalService: GlobalService) {

}

  title = 'St4rsend';

	panelDisplay: boolean=true;
	resizedFinished: any;

	ngOnInit() {
		this.router.events.pipe(
				filter(event => event instanceof NavigationEnd)
			).subscribe((evt) => {
				this.panelStrat();
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		clearTimeout(this.resizedFinished);
		this.resizedFinished = setTimeout(()=>{
			this.panelStrat();}, 350);
	}

	panelStrat() {
		if (window.matchMedia("(min-width: 800px)").matches) {
			this.panelDisplay = true;
		} else {
			this.panelDisplay = false;
		}
		this.globalService.setDisplayPanel(this.panelDisplay);
	}
}
