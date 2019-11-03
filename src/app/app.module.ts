import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryService } from './services';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  fakeBackendProvider,
  JwtInterceptor,
  ErrorInterceptor
} from '../helpers';

import {
  LoginComponent,
  MainShellComponent,
  CreateUserComponent,
  DashboardComponent,
  HeaderComponent,
  UsersComponent,
  UserDialogComponent,
  UserAddressDialogComponent
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    HeaderComponent,
    MainShellComponent,
    DashboardComponent,
    UsersComponent,
    UserDialogComponent,
    UserAddressDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
    NgbModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryService, {
      dataEncapsulation: false
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  entryComponents: [
    UserDialogComponent,
    UserAddressDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
