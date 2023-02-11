import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.sass']
})
export class ScienceComponent implements OnInit {
	private sub: any;
	private base_url: string = "https://www.st4rsend.net/prd-science/index.html";
	public url: SafeUrl="";

  constructor(
		private route: ActivatedRoute,
		private sanitizer: DomSanitizer,
		) { }

  ngOnInit(): void {
		this.sub = this.route.params.subscribe(params => {
			//console.log("SCIENCE: param id: ", params['id'])
			let target = this.base_url.concat('?target=', params['id'], '&theme=', params['theme']);
			this.url = this.sanitizer.bypassSecurityTrustResourceUrl(target);
			//console.log(this.url);
		});

  }

}
