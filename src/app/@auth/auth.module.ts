import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageComponent } from './containers/login-page.component';
import { LoginFormComponent } from './components/login-form.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';


import { FormsModule } from '@angular/forms';
import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth'
import { AuthRoutingModule } from './auth-routing.module'

import { LogoutPageComponent } from './containers/logout-page.component'

import {
  NbAuthComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

export const COMPONENTS = [LoginPageComponent, LoginFormComponent, LogoutPageComponent];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbCheckboxModule,
    NbCardModule,
    NbLayoutModule,
    NbAuthModule,
    AuthRoutingModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, AuthGuard],
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class RootAuthModule {}
