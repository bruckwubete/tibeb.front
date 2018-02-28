import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import {
  Authenticate,
  Login,
  LoginSuccess,
  LoginFailure,
  AuthActionTypes,
  Logout,
  Register,
  RegisterSuccess,
  RegisterFailure,
  ClearRegisterFlag,
  LoginRedirect,
  AuthenticateSuccess,
  AuthenticateFailure,
} from '../actions/auth';
import { User, AuthenticatePayload, RegisterPayload } from '../models/user';

@Injectable()
export class AuthEffects {

  @Effect()
  authenticate$ = this.actions$.pipe(
    ofType(AuthActionTypes.Authenticate),
    exhaustMap(() =>
      this.authService
        .isAuthenticated()
        .pipe(
          map(user => new AuthenticateSuccess({ user })),
          catchError(error => of(new AuthenticateFailure(error)))
        )
    )
  );

  // @Effect({ dispatch: false })
  // authSuccess$ = this.actions$.pipe(
  //   ofType(AuthActionTypes.AuthenticateSuccess),
  //   tap(() => {
  //     this.route.url.map(segments => segments.join('')).subscribe(str => console.log(str))
  //     this.router.navigate([this.router.url])
  //   })
  // );



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
    tap(() => {
      console.log(this.route)
      this.router.navigate(['/pages/dashboard'])
    })
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
    ofType(AuthActionTypes.LoginRedirect),
    tap(authed => {
      new Authenticate()
    })
  );


  @Effect({ dispatch: false })
  logOut$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    exhaustMap(() =>
      this.authService.logout()
    ),
    tap(authed => {
      setTimeout(() => {
        this.router.navigate(['/auth/login'])
     }, 3000);
    })
  );

  @Effect({ dispatch: false })
  authenticateFailure$ = this.actions$.pipe(
    ofType(AuthActionTypes.AuthenticateFailure),
    exhaustMap(() =>
      this.authService.logout()
    ),
    tap(authed => {
        this.router.navigate(['/auth/login'])
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
