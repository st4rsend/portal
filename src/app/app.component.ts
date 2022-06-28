import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
	constructor(private router: Router, private window: Window) {}

  title = 'St4rsend';

	ngOnInit() {
		// Keeping the below for memory
		this.router.events.pipe(
				filter(event => event instanceof NavigationEnd)
			).subscribe((evt) => {
			//console.log(this.window.clientInformation);
			//this.window.scrollTo(0, 0);
		});
	}
}
