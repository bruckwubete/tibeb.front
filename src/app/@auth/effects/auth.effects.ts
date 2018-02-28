import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import {
  Login,
  LoginSuccess,
  LoginFailure,
  AuthActionTypes,
  Logout,
  Register,
  RegisterSuccess,
  RegisterFailure,
  ClearRegisterFlag,
} from '../actions/auth';
import { User, AuthenticatePayload, RegisterPayload } from '../models/user';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((auth: AuthenticatePayload) =>
      this.authService
        .login(auth)
        .pipe(
          map(user => new LoginSuccess({ user })),
          catchError(error => of(new LoginFailure(error)))
        )
    )
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType(AuthActionTypes.Register),
    map((action: Register) => action.payload),
    exhaustMap((auth: RegisterPayload) =>
      this.authService
        .register(auth)
        .pipe(
          map(user => new RegisterSuccess({ user })),
          catchError(error => of(new RegisterFailure(error.message)))
        )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  registerSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.RegisterSuccess),
    tap(() => {
      setTimeout(() => {
        this.router.navigate(['/auth/login'])
      }, 2000);
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    exhaustMap(() =>
      this.authService.logout()
    ),
    tap(authed => {
      setTimeout(() => {
        this.router.navigate(['/auth/login'])
      }, 3000);
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
