import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { DocComponent } from './doc/doc.component';
import { MlComponent } from './ml/ml.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'doc', component: DocComponent },
	{ path: 'ml', component: MlComponent },
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
