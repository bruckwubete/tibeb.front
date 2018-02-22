/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './app-auth-guard';
import {httpFactory} from "./Factories/http.factory";

import { EtmdbAuthProvider } from './@core/auth/auth.provider'
import { NbAuthSimpleToken, NbTokenService } from '@nebular/auth';
import { EtmdbLoginComponent } from './pages/login/login.component'
import { EtmdbRegisterComponent } from './pages/register/register.component'

import { TibebTokenService } from './services/overrides/tibeb-token-service';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [AppComponent, EtmdbLoginComponent, EtmdbRegisterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    MomentModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    EtmdbAuthProvider,
    NbTokenService,
    TibebTokenService,

    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
})
export class AppModule {
}
