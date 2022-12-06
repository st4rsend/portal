import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'St4rsend';

	panelDisplay: boolean=true;
	panelDisplaySub$: Subscription;
	resizedFinished: any;
	darkTheme: boolean=false;

	constructor(
				private router: Router,
				private window: Window,
				private globalService: GlobalService) {
		this.panelDisplaySub$ = this.globalService.getDisplayPanel().subscribe(
			value => { this.panelDisplay=value; });
	}


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
			this.globalService.setDisplayPanel(true);
		} else {
			this.globalService.setDisplayPanel(false);
		}
	}
}
