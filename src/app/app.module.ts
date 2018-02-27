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
import { NbAuthSimpleToken } from '@nebular/auth';

import { EtmdbRegisterComponent } from './pages/register/register.component'

import { TibebTokenService } from './services/overrides/tibeb-token-service';
import { MomentModule } from 'angular2-moment';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { AuthModule } from './@auth/auth.module';

@NgModule({
  declarations: [AppComponent, EtmdbRegisterComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MomentModule,
    CoreModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    StoreModule.forRoot({}),
    AuthModule.forRoot(),

    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: 'router',
    }),
    EffectsModule.forRoot([])
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    EtmdbAuthProvider,
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
