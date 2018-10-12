import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEditorModule } from 'ngx-editor';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginService} from './login/login.service';
import {FormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPostComponent } from './new-post/new-post.component';
import {DashboardService} from './dashboard/dashboard.service';
import {TokenInterceptor} from './auth/token.interceptor';
import {AuthService} from './auth/auth.service';
import { NewBoardComponent } from './new-board/new-board.component';
import { TextPostComponent } from './posts/text-post/text-post.component';
import { TogglePostComponent } from './posts/toggle-post/toggle-post.component';
import { ShareBoardComponent } from './share-board/share-board.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NewPostComponent,
    NewBoardComponent,
    TextPostComponent,
    TogglePostComponent,
    ShareBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEditorModule,
    NgbModule.forRoot()
  ],
  providers: [
    LoginService,
    DashboardService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  entryComponents: [
    NewPostComponent,
    NewBoardComponent,
    ShareBoardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
