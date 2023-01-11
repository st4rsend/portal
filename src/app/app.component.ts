import { Inject, Component, OnInit, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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

	//appTheme: string="light-theme";
	appTheme: string="dark-theme";

	panelDisplay: boolean=true;
	panelDisplaySub$: Subscription;
	resizedFinished: any;
	darkTheme: boolean=false;

	constructor(
				@Inject(DOCUMENT) private document: Document,
				private router: Router,
				private window: Window,
				private globalService: GlobalService) {
		this.panelDisplaySub$ = this.globalService.getDisplayPanel().subscribe(
			value => { this.panelDisplay=value; });
	}


	ngOnInit() {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			this.darkTheme=true;
		} else {		
			this.darkTheme=false;
		}
		this.setStyle();
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

	setStyle() {
		if (this.darkTheme) {
			this.appTheme='dark-theme';
		} else {
			this.appTheme='light-theme';
		}
	}

	panelStrat() {
		if (window.matchMedia("(min-width: 800px)").matches) {
			this.globalService.setDisplayPanel(true);
		} else {
			this.globalService.setDisplayPanel(false);
		}
	}
	themeSet() {
		this.setStyle();
	}
}
