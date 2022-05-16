import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { DocComponent } from './doc/doc.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MlComponent } from './ml/ml.component';
import { KaggleSurveyComponent } from './ml/kaggle-survey/kaggle-survey.component';
import { DataExplorationComponent } from './ml/data-exploration/data-exploration.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'doc', component: DocComponent },
	{ path: 'intro', component: IntroductionComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'ml', component: MlComponent },
	{ path: 'kaggle-survey', component: KaggleSurveyComponent },
	{ path: 'explo', component: DataExplorationComponent },
];


@NgModule({
  declarations: [],
  imports: [
		RouterModule.forRoot(routes),
    CommonModule
  ],
	exports: [
		RouterModule,
	]
})
export class AppRoutingModule { }
