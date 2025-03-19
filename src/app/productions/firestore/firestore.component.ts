import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
//import { UserEnv } from '../../interfaces';
//import { PlotlyModule } from 'angular-plotly.js';

import * as Plotly from 'plotly.js-dist-min';

@Component({
  selector: 'app-plotly-chart',
  template: `<div #plotlyChart style="width: 100%; height: 400px;"></div>`,
})
export class PlotlyChartComponent implements AfterViewInit {
  @ViewChild('plotlyChart', { static: false }) plotlyChart!: ElementRef;
	@Input() data!: any;
	@Input() layout!: any;

  async ngAfterViewInit() {
		/*
    const trace1: Partial<Plotly.Data> = {
      x: [1, 2, 3, 4, 5],
      y: [10, 15, 13, 17, 20],
      type: 'scatter'
    };

    const layout = {
      title: 'Simple Plotly Chart',
      xaxis: { title: 'X Axis' },
      yaxis: { title: 'Y Axis' }
    };
		*/
		const PlotlyModule = await import('plotly.js-dist-min');

    //Plotly.newPlot(this.plotlyChart.nativeElement, [trace1], layout);
    Plotly.newPlot(
			this.plotlyChart.nativeElement,
			this.data,
			this.layout );
  }
}

@Component({
  selector: 'app-firestore',
  imports: [PlotlyChartComponent],
  //imports: [],
  templateUrl: './firestore.component.html',
  styleUrl: './firestore.component.sass'
})
export class FirestoreComponent {

	public appTheme: string = "light-theme";
	private subAuth: any;
	public docID: string = "";

//	public userEnv: UserEnv | null = null;
	
	public graphData = [
    	{
      	x: [1, 2, 3, 4],
      	y: [10, 15, 13, 17],
      	type: 'scatter'
    	}
  	];

	public graphLayout = { title: 'Interactive Plotly Graph' };

	constructor(
		private route: ActivatedRoute,
//		private authService: AuthService,
		private firestoreService: FirestoreService,
	) {}

	ngOnInit() {
		let subRoute = this.route.params.subscribe(params => {
			this.appTheme = params['theme'];
			this.docID = params['id'];
			console.log("DocID: ", this.docID);
		});

/*
		let subAuth = this.authService.getAuthState();
    subAuth.subscribe((userEnv: UserEnv|null) => {
      this.userEnv = userEnv;
      //console.log("userEnv: ", this.userEnv);
      if (this.userEnv == null) {
        console.log('logging');
        this.authService.signInAnonymously();
      } else {
        console.log("logged");
      }
    });
*/
	}

	async readDoc() {
		console.log(this.docID);
		let datatest = await this.firestoreService.asyncReadConv(this.docID);
		console.log(datatest);
	} 

	onGraphClick(event: any) {
    console.log('Graph clicked:', event);
    alert(`Clicked on point: x=${event.points[0].x}, y=${event.points[0].y}`);
  }
}

