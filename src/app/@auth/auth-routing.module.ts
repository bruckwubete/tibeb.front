import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

import { LoginPageComponent } from './containers/login-page.component'
import { LogoutPageComponent } from './containers/logout-page.component'

const routes: Routes = [
  {
    path: '',
    component: NbLoginComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'logout',
    component: LogoutPageComponent,
  },
  {
    path: 'request-password',
    component: NbRequestPasswordComponent,
  },
  {
    path: 'reset-password',
    component: NbResetPasswordComponent,
  }
]

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
