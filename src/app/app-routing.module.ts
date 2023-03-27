import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { DocComponent } from './doc/doc.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductionsComponent } from './productions/productions.component';
import { StaticComponent } from './productions/static/static.component';
import { ScienceComponent } from './productions/science/science.component';
import { KaggleSurveyComponent } from './productions/kaggle-survey/kaggle-survey.component';
import { DataExplorationComponent } from './productions/data-exploration/data-exploration.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'doc', component: DocComponent },
	{ path: 'intro/:theme', component: IntroductionComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'productions/:theme', component: ProductionsComponent },
	{ path: 'static/:id/:theme', component: StaticComponent },
	{ path: 'science/:id/:theme', component: ScienceComponent },
	{ path: 'kaggle-survey', component: KaggleSurveyComponent },
	{ path: 'explo', component: DataExplorationComponent },
];


@NgModule({
  declarations: [],
  imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			// Fix browser refresh 404
			useHash: true}),
    CommonModule
  ],
	exports: [
		RouterModule,
	]
})
export class AppRoutingModule { }
