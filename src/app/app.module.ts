import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';

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
import { ScienceComponent } from './productions/science/science.component';
import { IframeDynamicDirective } from './iframe-dynamic.directive';

@NgModule({
  declarations: [
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
    ScienceComponent,
    IframeDynamicDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		MatCheckboxModule,
		MatTreeModule,
		MatIconModule,
		MatSlideToggleModule,
  ],
  //providers: [ {provide: APP_BASE_HREF, useValue: '/portal'} ],
  providers: [ {provide: APP_BASE_HREF, useValue: environment.baseURL},
							{provide: Window, useValue: window}
						 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
