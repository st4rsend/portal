import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DocComponent } from './doc/doc.component';
import { MlComponent } from './ml/ml.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocComponent,
    MlComponent,
    IntroductionComponent,
    ContactsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  //providers: [ {provide: APP_BASE_HREF, useValue: '/portal'} ],
  providers: [ {provide: APP_BASE_HREF, useValue: environment.baseURL} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
