import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthenticatePayload } from '../models/user';
import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';

@Component({
  selector: 'bc-login-page',
  template: `
    <bc-login-form
      (submitter)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </bc-login-form>
  `,
  styles: [],
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onSubmit($event: AuthenticatePayload) {
    this.store.dispatch(new Auth.Login($event));
  }
}
