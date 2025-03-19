import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
//import { UserEnv } from '../../interfaces';
//import { PlotlyModule } from 'angular-plotly.js';


@Component({
  selector: 'app-firestore',
  imports: [],
  templateUrl: './firestore.component.html',
  styleUrl: './firestore.component.sass'
})
export class FirestoreComponent {

	public appTheme: string = "light-theme";
	private subAuth: any;
	public docID: string = "";

//	public userEnv: UserEnv | null = null;
	
	graphData = [
    	{
      	x: [1, 2, 3, 4],
      	y: [10, 15, 13, 17],
      	type: 'scatter'
    	}
  	];

	graphLayout = { title: 'Interactive Plotly Graph' };

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
