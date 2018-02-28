import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';


import { FormsModule } from '@angular/forms';
import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth'
import { AuthRoutingModule } from './auth-routing.module'

import { LoginPageComponent } from './containers/login/login-page.component';
import { LoginFormComponent } from './components/login-form.component';
import { LogoutPageComponent } from './containers/logout/logout-page.component'
import { RegisterFormComponent } from './components/register-form.component';
import { RegisterPageComponent } from './containers/register/register-page.component';

import {
  NbAuthComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';


export const COMPONENTS = [LoginPageComponent, LoginFormComponent, LogoutPageComponent, RegisterFormComponent, RegisterPageComponent];


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
