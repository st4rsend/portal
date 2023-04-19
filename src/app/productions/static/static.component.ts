import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser';
import { SafeScript } from '@angular/platform-browser';

import { GlobalService } from '../../global.service';

const headers = new HttpHeaders ({
  'Access-Control-Allow-Origin': 'https://storage.googleapis.com',
	'content-type': 'xml'
 })

const BASE_URL: string = 'https://www.st4rsend.net/static/';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.sass']
})
export class StaticComponent implements OnInit {
	private sub: any;
	private listenerApplied: boolean = false;
	private innerReady: boolean = false;

	public appTheme: string = "light-theme";
	public stickyBottom: boolean = false;
	public bottomStyle: string = "bottom-scroll";

	public overlayContent = 'OVERLAY';
	public showOverlay = false;

	buf: any = "buf";
	inner: string = "Hi";
	public text: string = "Hello interpolated string";

  constructor(
			private route: ActivatedRoute,
			private httpClient: HttpClient,
			private elementRef: ElementRef,
			private sanitizer: DomSanitizer,
			private globalService: GlobalService
			) { 
	}

  ngOnInit(): void {
		this.sub = this.route.params.subscribe(params => {
			this.appTheme = params['theme'];
			let url = BASE_URL.concat(params['id'].replace(/-/g, "/").concat(".html"));
			this.httpClient.get(url, { headers: headers, responseType: 'text'}).subscribe(data => {
				try {
					this.buf = eval("`" + data + "`");
				} catch(e) {
					console.log(e);
					this.buf = "<BR><BR>!!! <b>WARNING: Interpolation error</b> !!!" +
								"<BR>----------------------------------------------------------<BR>" +
								 e +
								"<BR>----------------------------------------------------------<BR>" +
								 data;
				}
				this.inner = this.sanitizer.bypassSecurityTrustHtml(this.buf) as string;
				this.innerReady=true;
			});
		});
		this.globalService.getStickyBottom().subscribe(
			value => {
				if (value) {
					this.bottomStyle="bottom-fixed";
				} else {
					this.bottomStyle="bottom-scroll";
				}
			});
  }

	ngAfterViewChecked (){
		if (!this.listenerApplied && this.innerReady) {
			this.addEventListeners();
		}
	}
	addEventListeners(): void {
		if(this.elementRef.nativeElement.querySelector('.button-test')){
			this.elementRef.nativeElement.querySelector('.button-test').addEventListener('click', this.clickTest.bind(this));
		}
		const overlayElems = this.elementRef.nativeElement.querySelectorAll('.overlay');
		if (overlayElems) {
			overlayElems.forEach((overlayElem: HTMLElement) => {
				overlayElem.addEventListener('click', (event: MouseEvent) => this.requestOverlay(event));
			});
		}
		this.listenerApplied = true;
	}


	clickTest() {
		console.log("Click Test");
	}

	requestOverlay(event: MouseEvent) {
		const target = event.target as Element;
		if (target instanceof Element) {
			this.overlayContent = target.getAttribute('text') || 'text attribute missing';
			
/*
			const overlay = document.querySelector('.overlay-content') as HTMLElement;
			const x = event.clientX;
			const y = event.clientY;
			console.log(y);
			if (overlay) {
				console.log(overlay);
				overlay.style.top = y - overlay.offsetHeight + 'px';
			}
*/
			this.showOverlay=true;
		}
	}

	buttonTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	hideOverlay() {
		this.showOverlay=false;
	}

}
