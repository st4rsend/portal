import {
	Component,
	AfterViewInit,
	ElementRef,
	Input,
	ViewChild,
	ViewContainerRef,
	ComponentFactoryResolver,
	Type, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PlotlyComponent } from './plotly/plotly.component';
import { TextComponent } from './text/text.component';
import { KatexComponent } from './katex/katex.component';

import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../global.service';


interface FirestoreItem {
	label: string;
	selector: string;
	raw_data: string;
}

interface FirestoreData {
	[key: string]: FirestoreItem;
}

const COMPONENT_MAP: { [key: string]: Type<any> } = {
	text: TextComponent,
	plotly: PlotlyComponent,
	katex: KatexComponent
}

@Component({
  selector: 'app-firestore',
  templateUrl: './firestore.component.html',
  styleUrl: './firestore.component.sass',
	standalone: false
})
export class FirestoreComponent {

	@ViewChild('dynamicHost', {'read': ViewContainerRef, static: true})
	viewContainerRef!: ViewContainerRef;

	public appTheme: string = "light-theme";

	public stickyBottom: boolean = false;
	public bottomStyle: string = "bottom-scroll";
	public overlayContent = 'OVERLAY';
	public showOverlay = false;

	public docID: string = "";
	public path: string = "";

	private docMaster = "Xj2sEuNvzDtXlTkV2Xnp";

	constructor(
		private route: ActivatedRoute,
		private httpClient: HttpClient,
		private authService: AuthService,
		private resolver: ComponentFactoryResolver,
		private globalService: GlobalService,
	) {}



	ngOnInit() {
		let subRoute = this.route.params.subscribe(params => {
			this.appTheme = params['theme'];
			this.docID = params['id'];
			this.readDoc();
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

	readDoc() {
		//console.log("Reading: ", this.docID);
		let bearer: string = this.authService.getBearerToken();
		let url:string = "https://europe-west6-gcp-learning-project-195511.cloudfunctions.net/readContentDoc"
		
		const params = new HttpParams()
			.set("docmaster", this.docMaster)
			.set("docid", this.docID);
		this.httpClient.get<FirestoreData>(url, {
			headers: {
				Authorization: `Bearer ${bearer}`,
				'Accept': 'application/json'
			},
			params}).subscribe({
				next:(data) => this.formatDoc(data),
				error:(err) => console.log("Request failed", err)
			});
		}

	formatDoc(data: FirestoreData) {
		Object.keys(data)
			.sort((a, b) => Number(a) - Number(b))
			.sort((a, b) => Number(a) - Number(b))
			.forEach(key => {
				if(key=='0') {
					//  console.log("Meta");
					let meta = data[key] as unknown as {[key: string]: string};
					this.path = meta['path'];
					console.log(meta);
				} else {
					const comp = COMPONENT_MAP[data[key]['selector']];
					if (!comp) {
						console.warn(`Unknown selector "${data[key]['selector']}"`);
					} else {
						const factory = this.resolver.resolveComponentFactory(comp);
						const compRef = this.viewContainerRef.createComponent(factory);
						compRef.instance.data = data[key]['raw_data'];
					}	
				}
			});
	}

	buttonTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	hideOverlay() {
		this.showOverlay=false;
	}
}
