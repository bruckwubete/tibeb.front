import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthenticatePayload } from '../../models/user';
import * as fromAuth from '../../reducers';
import * as Auth from '../../actions/auth';

@Component({
  selector: 'tb-login-page',
  template: `
    <tb-login-form
      (submitter)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
      [loggedIn]="loggedIn$ | async">
    </tb-login-form>
  `,
  styles: [],
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {
    this.store.dispatch(new Auth.ClearRegisterFlag())
  }

  onSubmit($event: AuthenticatePayload) {
    this.store.dispatch(new Auth.Login($event));
  }
}
