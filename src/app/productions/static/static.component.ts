import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';



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
	buf: any;
	inner: string = "Hi";

  constructor(
			private route: ActivatedRoute,
			private httpClient: HttpClient,
			//private sanitizer: DomSanitizer
			) { }

  ngOnInit(): void {
		this.sub = this.route.params.subscribe(params => {
			console.log(params['id']);
			let url = BASE_URL.concat(params['id'].concat(".html"));
			console.log(url);
			this.httpClient.get(url, { headers: headers, responseType: 'text'}).subscribe(data => {
				this.inner = data;
			});
		});
  }

}
