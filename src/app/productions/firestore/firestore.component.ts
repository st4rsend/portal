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

interface ApiRow {
  id: string;
  label: string;
  selector: string;
  raw_data: string;
}

interface ApiMeta {
  name?: string;
  path?: string;
  idx?: number;
  extra?: any;
}

interface ApiDoc {
  meta: ApiMeta | null;
  rows: ApiRow[];
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

	private docMaster = "04pTxuGC4yp8qxh1gm2i";

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
			}
		);
	}

	readDoc() {
		let bearer: string = this.authService.getBearerToken();
		let url:string = "https://europe-west6-gcp-learning-project-195511.cloudfunctions.net/readContentDocV2"
		
		const params = new HttpParams()
			.set("docmaster", this.docMaster)
			.set("docid", this.docID);
		this.httpClient.get<ApiDoc>(url, {
			headers: {
				Authorization: `Bearer ${bearer}`,
				'Accept': 'application/json'
			},
			params}).subscribe({
				next:(data) => this.formatDoc(data),
				error:(err) => console.log("Request failed", err)
			});
		}

	formatDoc(doc: ApiDoc) {
		this.viewContainerRef.clear();

		if (doc.meta?.path) this.path = doc.meta.path;
		for (const row of doc.rows) {
			const comp = COMPONENT_MAP[row.selector];
			if (!comp) {
				console.warn(`Unknown selector "${row.selector}" for unit ${row.id}`);
				continue;
			}
			const compRef = this.viewContainerRef.createComponent(comp);
			compRef.instance.data = row.raw_data;
  	}
	}

	buttonTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	hideOverlay() {
		this.showOverlay=false;
	}
}
