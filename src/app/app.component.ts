import { Inject, Component, OnInit, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {MatMenuModule} from '@angular/material/menu';


import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'St4rsend';

	appTheme: string="light-theme";
	//appTheme: string="dark-theme";
	menuStyle: string="menu-scroll";

	panelDisplay: boolean=true;
	panelDisplaySub$: Subscription;
	resizedFinished: any;
	darkTheme: boolean=false;
	stickyMenu: boolean=false;
	stickyBottom: boolean=false;

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

	menuSet() {
		if (this.stickyMenu) {
			this.menuStyle='menu-fixed';
		} else {
			this.menuStyle='menu-scroll';
		}
	}

	bottomSet() {
		this.globalService.setStickyBottom(this.stickyBottom);
	}

	panelStrat() {
		if (window.matchMedia("(min-width: 1280px)").matches) {
			this.globalService.setDisplayPanel(true);
		} else {
			this.globalService.setDisplayPanel(false);
		}
	}
	themeSet() {
		this.setStyle();
	}
}
