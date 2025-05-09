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
import { FirestoreComponent } from './productions/firestore/firestore.component';
import { IframeDynamicDirective } from './iframe-dynamic.directive';

import {initializeApp,provideFirebaseApp} from '@angular/fire/app';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {api} from '../environments/shadow';

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
				FirestoreComponent,
        SvgComponent,
        ScienceComponent,
        IframeDynamicDirective,
    ],
    bootstrap: [AppComponent,],
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
		],
		providers: [
			{ provide: APP_BASE_HREF, useValue: environment.baseURL },
			{ provide: Window, useValue: window },
			provideHttpClient(withInterceptorsFromDi()),
			provideFirebaseApp(() => initializeApp(api.firebase)),
			provideAuth(() => getAuth()),
			provideFirestore(() => getFirestore()),
/*
			provideAuth(() => {
				const auth = getAuth();
				return auth;
			}),
			provideFirestore(() => {
				const firestore = getFirestore();
				return firestore;
			}),
*/
		]})
export class AppModule { }
