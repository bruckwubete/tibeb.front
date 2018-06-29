/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '@nebular/auth';
import * as fromAuth from '../../reducers';
import { Store, select } from '@ngrx/store';
import * as Auth from '../../actions/auth';
import { RegisterPayload } from '../../models/user';

import { NbAuthResult, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'nb-register',
  template: `
    <tb-register-form
      (submitter)="register($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
      [registered]="registered$ | async">
    </tb-register-form>
  `,
})
export class RegisterPageComponent {
  pending$ = this.store.pipe(select(fromAuth.getRegisterPagePending));
  error$ = this.store.pipe(select(fromAuth.getRegisterPageError));
  registered$ = this.store.pipe(select(fromAuth.getRegistered));

  constructor(private store: Store<fromAuth.State>) {
  }

  register($event: RegisterPayload): void {
    this.store.dispatch(new Auth.Register($event))
  }
}
