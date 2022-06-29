import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DocComponent } from './doc/doc.component';
import { MlComponent } from './ml/ml.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ContactsComponent } from './contacts/contacts.component';
import { KaggleSurveyComponent } from './ml/kaggle-survey/kaggle-survey.component';
import { DataExplorationComponent } from './ml/data-exploration/data-exploration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainBodyComponent } from './main-body/main-body.component';
import { FixedPanelComponent } from './fixed-panel/fixed-panel.component';
import { CartpoleComponent } from './fixed-panel/cartpole/cartpole.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocComponent,
    MlComponent,
    IntroductionComponent,
    ContactsComponent,
    KaggleSurveyComponent,
    DataExplorationComponent,
    MainBodyComponent,
    FixedPanelComponent,
    CartpoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
		FormsModule,
		MatCheckboxModule,
  ],
  //providers: [ {provide: APP_BASE_HREF, useValue: '/portal'} ],
  providers: [ {provide: APP_BASE_HREF, useValue: environment.baseURL},
							{provide: Window, useValue: window}
						 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
