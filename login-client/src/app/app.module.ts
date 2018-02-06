import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { LandingComponent } from './landing/landing.component'
import { UsersService } from './users.service';
import { UserdashboardComponent } from './userdashboard/userdashboard.component'
import {BehaviorSubject} from 'Rxjs';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { PlaygameComponent } from './playgame/playgame.component';
import { SearchresComponent } from './searchres/searchres.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    UserdashboardComponent,
    AddquestionComponent,
    PlaygameComponent,
    SearchresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [UsersService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
