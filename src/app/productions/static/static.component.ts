import { Component, OnInit, AfterViewChecked, ElementRef, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
//import * as DOMPurify from 'dompurify';
import DOMPurify from 'dompurify';
import { SafeHtml } from '@angular/platform-browser';
//import { SafeResourceUrl } from '@angular/platform-browser';
//import { SafeUrl } from '@angular/platform-browser';
//import { SafeScript } from '@angular/platform-browser';

import { GlobalService } from '../../global.service';

const headers = new HttpHeaders ({
  'Access-Control-Allow-Origin': 'https://storage.googleapis.com',
	'content-type': 'xml'
 })

const BASE_URL: string = 'https://www.st4rsend.net/static/';

declare var MathJax: any;


@Component({
    selector: 'app-static',
    templateUrl: './static.component.html',
    styleUrls: ['./static.component.sass'],
    standalone: false
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
					this.buf = data;
				} catch(e) {
					console.log(e);
					this.buf = "<BR><BR>!!! <b>WARNING: Interpolation error</b> !!!" +
								"<BR>----------------------------------------------------------<BR>" +
								 e +
								"<BR>----------------------------------------------------------<BR>" +
								 data;
				}
				this.buf = DOMPurify.sanitize(this.buf, { 
					ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'i', 'b', 'p', 'li', 'ul', 'pre', 'button'], 
					ADD_ATTR: []
				});
				this.inner = this.sanitizer.bypassSecurityTrustHtml(this.buf) as string;
				setTimeout(() => {
					if (typeof MathJax !== 'undefined') {
						MathJax.typeset();
					}
				}, 0);
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


/*
	ngAfterViewInit() {
		if (typeof MathJax !== 'undefined') {
			MathJax.typesetPromise().then(() => {
			// MathJax has finished typesetting
			}).catch((err: any) => {
				// MathJax typesetting failed
				console.error('MathJax typesetting failed: ', err);
			});
		}
	}
*/
	ngAfterViewChecked (){
		if (!this.listenerApplied && this.innerReady) {
			this.addEventListeners();
		}
	}
	addEventListeners(): void {
		const eventA = this.elementRef.nativeElement.querySelectorAll('.eventA');
		if(eventA) {
			eventA.forEach((eventA: HTMLElement) => {
				eventA.addEventListener('click', (event: MouseEvent) => this.clickTest(eventA.getAttribute('value')));
			});
		}
		const overlayElems = this.elementRef.nativeElement.querySelectorAll('.overlay');
		if (overlayElems) {
			overlayElems.forEach((overlayElem: HTMLElement) => {
				overlayElem.addEventListener('click', (event: MouseEvent) => this.requestOverlay(event));
			});
		}
		this.listenerApplied = true;
	}


	clickTest(value: any) {
		console.log("Click Test value:", value);
		//alert(value);
	}

	requestOverlay(event: MouseEvent) {
		const target = event.target as Element;
		if (target instanceof Element) {
			this.overlayContent = target.getAttribute('value') || target.getAttribute('title') || 'text attribute missing';
			
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
