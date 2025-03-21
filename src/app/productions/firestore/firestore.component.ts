import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data, Layout, Config } from 'plotly.js-dist-min';

import { FirestoreService } from '../../services/firestore.service';
import { PlotlyChartComponent } from '../plotly-chart/plotly-chart.component';

@Component({
  selector: 'app-firestore',
  imports: [PlotlyChartComponent],
  templateUrl: './firestore.component.html',
  styleUrl: './firestore.component.sass'
})
export class FirestoreComponent {

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
	) {}

	ngOnInit() {
		let subRoute = this.route.params.subscribe(params => {
			this.appTheme = params['theme'];
			this.docID = params['id'];
			console.log("DocID: ", this.docID);
		});
	}

	async readDoc() {
		const jsonString= await this.firestoreService.asyncReadConv(this.docID);
		try {
			const next = JSON.parse(jsonString["plotly_json"]);
			this.graphData = next.data;
			this.graphLayout = next.layout;
		} catch(e){
			console.error("Error parsing Plotly data: ", e);
		}
	} 

	onGraphClick(event: any) {
    console.log('Graph clicked:', event);
    alert(`Clicked on point: x=${event.points[0].x}, y=${event.points[0].y}`);
  }
}

