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
import { FirestoreService } from '../../services/firestore.service';
import { PlotlyComponent } from './plotly/plotly.component';
import { TextComponent } from './text/text.component';
import { KatexComponent } from './katex/katex.component';

interface FirestoreItem {
	name: string;
	selector: string;
	raw_data: string;
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

	constructor(
		private route: ActivatedRoute,
		private firestoreService: FirestoreService,
		private resolver: ComponentFactoryResolver
	) {}



	ngOnInit() {
		let subRoute = this.route.params.subscribe(params => {
			this.appTheme = params['theme'];
			this.docID = params['id'];
			console.log("DocID: ", this.docID);
		});
	}

	async readDoc() {
		const firestoreData : { [key: string]: FirestoreItem } 
		= await this.firestoreService.asyncReadConv(this.docID);
		Object.keys(firestoreData)
		.sort((a, b) => Number(a) - Number(b))
		.forEach(key => {
			const comp = COMPONENT_MAP[firestoreData[key]['selector']];
			if (!comp) {
				console.warn(`Unknown selector "${firestoreData[key]['selector']}"`);
			} else {
				const factory = this.resolver.resolveComponentFactory(comp);
				const compRef = this.viewContainerRef.createComponent(factory);
				compRef.instance.data = firestoreData[key]['raw_data'];
			};
		});
	} 

	buttonTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	hideOverlay() {
		this.showOverlay=false;
	}
}
