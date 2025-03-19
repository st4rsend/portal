import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DocComponent } from './doc/doc.component';
import { ProductionsComponent } from './productions/productions.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ContactsComponent } from './contacts/contacts.component';
import { KaggleSurveyComponent } from './productions/kaggle-survey/kaggle-survey.component';
import { DataExplorationComponent } from './productions/data-exploration/data-exploration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainBodyComponent } from './main-body/main-body.component';
import { FixedPanelComponent } from './fixed-panel/fixed-panel.component';
import { CartpoleComponent } from './fixed-panel/cartpole/cartpole.component';
import { StaticComponent } from './productions/static/static.component';
import { SvgComponent } from './productions/svg/svg.component';
import { ScienceComponent } from './productions/science/science.component';
import { IframeDynamicDirective } from './iframe-dynamic.directive';

import {initializeApp,provideFirebaseApp} from '@angular/fire/app';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {api} from '../environments/shadow';

//import { PlotlyModule } from 'angular-plotly.js';
//import * as PlotlyJS from 'plotly.js-dist-min';
//import * as PlotlyJS from 'plotly.js-dist';

//PlotlyModule.plotlyjs = PlotlyJS;

/*
import { MathjaxModule } from 'mathjax-angular';

let mathjaxConfig = {
  config: {
    loader: {
      //load: ["output/svg", "[tex]/require", "[tex]/ams"]
      load: ["output/chtml", "[tex]/require", "[tex]/ams"]
    },
    tex: {
      inlineMath: [["$", "$"]],
      packages: ["base", "require", "ams"]
    },
    svg: { "fontCache": "global" }
  },
  //src: "https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/startup.js",
  src: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js",
	options: {
		enableMenu: true
	}
}
*/

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        DocComponent,
        ProductionsComponent,
        IntroductionComponent,
        ContactsComponent,
        KaggleSurveyComponent,
        DataExplorationComponent,
        MainBodyComponent,
        FixedPanelComponent,
        CartpoleComponent,
        StaticComponent,
        SvgComponent,
        ScienceComponent,
        IframeDynamicDirective,
    ],
    bootstrap: [AppComponent],
		 imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatCheckboxModule,
        MatTreeModule,
        MatIconModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatButtonModule,
//        MathjaxModule.forRoot(mathjaxConfig),
				//PlotlyModule.forRoot(Plotly),
//				PlotlyModule,
		],
		providers: [
			{ provide: APP_BASE_HREF, useValue: environment.baseURL },
			{ provide: Window, useValue: window },
			provideHttpClient(withInterceptorsFromDi()),
			provideFirebaseApp(() => initializeApp(api.firebase)),
			provideAuth(() => {
				const auth = getAuth();
				return auth;
			}),
			provideFirestore(() => {
				const firestore = getFirestore();
				return firestore;
			}),
		]})
export class AppModule { }
