// import { Injectable } from '@angular/core';
// import { of } from 'rxjs/observable/of';
// import { _throw } from 'rxjs/observable/throw';
// import { User, AuthenticatePayload } from '../models/user';
// import { Observable } from 'rxjs/Observable';

// @Injectable()
// export class AuthService {
//   constructor() {}

//   login({ usernameEmail, password }: AuthenticatePayload): Observable<User> {
//     /**
//      * Simulate a failed login to display the error
//      * message for the login form.
//      */
//     if (usernameEmail !== 'test') {
//       return _throw('Invalid username or password');
//     }

//     return of({ name: 'User' });
//   }

//   logout() {
//     return of(true);
//   }
// }


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http} from '@angular/http';
import {HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { NbAbstractAuthProvider, NbAuthResult } from '@nebular/auth';
import { TibebTokenService } from '../../services/overrides/tibeb-token-service';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { User, AuthenticatePayload } from '../models/user';

export interface EtmdbAuthProviderConfig {
  delay?: number;
  alwaysFail?: boolean;
}

@Injectable()
export class AuthService {

  protected _tokenService: TibebTokenService;


  constructor(private http: Http, _tokenService: TibebTokenService) {
    this._tokenService = _tokenService
    this._tokenService.init({
      apiBase:                    'http://localhost:3000',
      apiPath:                    'api/v1',

      signInPath:                 'auth/sign_in',
      signInRedirect:             'pages/dashboard',
      signInStoredUrlStorageKey:  null,

      signOutPath:                'auth/sign_out',
      validateTokenPath:          'auth/validate_token',
      signOutFailedValidate:      false,

      registerAccountPath:        'auth',
      deleteAccountPath:          'auth',
      registerAccountCallback:    'pages/login',

      updatePasswordPath:         'auth',
      resetPasswordPath:          'auth/password',
      resetPasswordCallback:      window.location.href,

      oAuthBase:                  window.location.origin,
      oAuthPaths: {
          github:                 'auth/github'
      },
      oAuthCallbackPath:          'oauth_callback',
      oAuthWindowType:            'newWindow',
      oAuthWindowOptions:         null,

      userTypes:                  null,

      globalOptions: {
          headers: {
              'Content-Type':     'application/json',
              'Accept':           'application/json'
          }
      }
  })
  }

  protected defaultConfig: EtmdbAuthProviderConfig = {
    delay: 1000,
  };

  isAuthenticated():Observable<User> {
    return this._tokenService.validateToken().map(
      res =>      {
        return of({...res.json().data})
      }
    ).catch( error =>  _throw(new Error(error.json().errors)))
  }


  login({ usernameEmail, password }: AuthenticatePayload): Observable<User> {

    return this._tokenService.signIn({
      email: usernameEmail,
      password: password
    }).map(
      res =>      {
        return of({...res.json().data})
      }
    ).catch( error => _throw(new Error(error.json().errors)))
  }

  register(data?: any): Observable<User> {

    return this._tokenService.registerAccount(data).map(
      res =>      {
          return of({...res.json().data})
        }
    ).catch( error => _throw(new Error(error.errors.email)))

  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    // return Observable.of(this.createDummyResult(data))
    //   .delay(this.getConfigValue('delay'));
    return Observable.of(new NbAuthResult(false))
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
    // return Observable.of(this.createDummyResult(data))
    //   .delay(this.getConfigValue('delay'));
    return Observable.of(new NbAuthResult(false))
  }

  logout(): Observable<NbAuthResult> {
    return this._tokenService.signOut().map(
      res =>      {
          return new NbAuthResult(
              true,
              res,
              '/pages/login',
              [],
              'successfully logged out'
          )
        }
    ).catch( error =>   {console.log(error); return Observable.of(new NbAuthResult(false))})
  }
}
