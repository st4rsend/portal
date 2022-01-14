import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { DocComponent } from './doc/doc.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'doc', component: DocComponent },
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
