import { Component, OnInit, AfterViewChecked, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser';
import { SafeScript } from '@angular/platform-browser';


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
	buf: any = "buf";
	inner: string = "Hi";
	public text: string = "Hello interpolated string";

  constructor(
			private route: ActivatedRoute,
			private httpClient: HttpClient,
			private elementRef: ElementRef,
			private sanitizer: DomSanitizer
			) { }

  ngOnInit(): void {
		this.sub = this.route.params.subscribe(params => {
			//console.log(params['id']);
			let url = BASE_URL.concat(params['id'].concat(".html"));
			this.httpClient.get(url, { headers: headers, responseType: 'text'}).subscribe(data => {
				//this.inner = data;
				console.log(data);
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
				this.buf = this.sanitizer.bypassSecurityTrustHtml(this.buf);
				console.log(this.buf);
				this.inner = this.buf;
			});
		});
  }

	clickTest() {
		console.log("Click Test");
	}

	ngAfterViewChecked (){
		console.log("afterviewcheck");
		if(this.elementRef.nativeElement.querySelector('#button-test')){
			this.elementRef.nativeElement.querySelector('#button-test').addEventListener('click', this.clickTest.bind(this));
		}
	}

}
