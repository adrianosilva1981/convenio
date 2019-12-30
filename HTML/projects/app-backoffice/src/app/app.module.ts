import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { GrowlModule } from 'primeng/growl';

import { environment } from '@env';
import { LibServicesModule, MessageInterceptor } from 'lib-services';

import { AppComponent } from '@app-backoffice/app.component';
import { HomeComponent } from '@app-backoffice/pages/home/home.component';
import { AppRouting } from '@app-backoffice/app.routing';
import { CleanComponent } from '@app-backoffice/layouts/clean/clean.component';
import { AuthGuard } from '@app-backoffice/services/auth.guard';
import { LoginComponent } from '@app-backoffice/pages/login/login.component';
import { PageNotFoundComponent } from '@app-backoffice/pages/page-not-found/page-not-found.component';
import { DefaultComponent } from '@app-backoffice/layouts/default/default.component';

@NgModule({
  declarations: [
    AppComponent,
    CleanComponent,
    DefaultComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LibServicesModule,
    InputTextModule,
    GrowlModule,
    AppRouting
  ],
  providers: [
    AuthGuard,
    { provide: 'environments', useValue: environment },
    { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true }
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
