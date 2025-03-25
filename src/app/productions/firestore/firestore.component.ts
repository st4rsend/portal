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
import { Data, Layout, Config } from 'plotly.js-dist-min';

import { FirestoreService } from '../../services/firestore.service';
import { PlotlyComponent } from './plotly/plotly.component';
import { TextComponent } from './text/text.component';

interface FirestoreItem {
	name: string;
	selector: string;
	raw_data: string;
}

const COMPONENT_MAP: { [key: string]: Type<any> } = {
	text: TextComponent,
	plotly: PlotlyComponent
}

@Component({
  selector: 'app-firestore',
  imports: [],
  templateUrl: './firestore.component.html',
  styleUrl: './firestore.component.sass'
})
export class FirestoreComponent {

	@ViewChild('dynamicHost', {'read': ViewContainerRef, static: true})
	viewContainerRef!: ViewContainerRef;

	public appTheme: string = "light-theme";
	private subAuth: any;
	public docID: string = "";

	
	public graphData: Data[] = [
    	{
      	x: [1, 2, 3, 4],
      	y: [10, 15, 13, 17],
      	type: 'scatter'
    	}
  	];

	public graphLayout: Partial<Layout> = { title: 'Interactive Plotly Graph' };
	public graphConfig: Partial<Config> = {};

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
		const firestoreData : { [key: string]: FirestoreItem } = await this.firestoreService.asyncReadConv(this.docID);
		try {
			Object.keys(firestoreData)
			.sort((a, b) => Number(a) - Number(b))
			.forEach(key => {
				console.log(key, ' => ', firestoreData[key]['selector']);
				const comp = COMPONENT_MAP[firestoreData[key]['selector']];
				if (!comp) {
					console.warn(`Unknown selector "${firestoreData[key]['selector']}"`);
				} else {
					const factory = this.resolver.resolveComponentFactory(comp);
					const compRef = this.viewContainerRef.createComponent(factory);
					compRef.instance.data = firestoreData[key]['raw_data'];
				};
			});
/*
			const next = JSON.parse(firestoreData[2]["raw_data"]);
			this.graphData = next.data;
			this.graphLayout = next.layout;
*/
			console.log(firestoreData[1]['name'], firestoreData[1]['raw_data']);

		} catch(e){
			console.error("Error parsing Plotly data: ", e);
		}

	} 

	onGraphClick(event: any) {
    console.log('Graph clicked:', event);
    alert(`Clicked on point: x=${event.points[0].x}, y=${event.points[0].y}`);
  }
}

