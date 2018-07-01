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
import { environment } from "../../../environments/environment";
import { UserService } from '../../@core/data/users.service';

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
      apiBase:                    `${environment.origin}`,
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
    return this._tokenService.validateToken().map( res =>  this.parseUser(res)
    ).catch( error =>  _throw(new Error(error.json().errors)))
  }

  login({ usernameEmail, password }: AuthenticatePayload): Observable<User> {
    return this._tokenService.signIn({
      email: usernameEmail,
      password: password
    }).map((res) =>  this.parseUser(res))
    .catch( error => _throw(new Error(error.json().errors)))
  }

  register(data?: any): Observable<User> {
    return this._tokenService.registerAccount(data).map( res =>  this.parseUser(res))
    .catch( error => _throw(new Error(error.errors.full_messages[0])))
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return Observable.of(new NbAuthResult(false))
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
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

  // Helper Functions

  private parseUser(user: any) :User {
    const userJson = user.data || user.json().data

    return {
      firstName: userJson.first_name,
      lastName: userJson.last_name,
      value: userJson
    }
 }
}
