import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http} from '@angular/http';
import {HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { NbAbstractAuthProvider, NbAuthResult } from '@nebular/auth';
import { TibebTokenService } from '../../services/overrides/tibeb-token-service';
import { environment } from "../../../environments/environment";

export interface EtmdbAuthProviderConfig {
  delay?: number;
  alwaysFail?: boolean;
}

@Injectable()
export class EtmdbAuthProvider extends NbAbstractAuthProvider {

  protected _tokenService: TibebTokenService;


  constructor(private http: Http, _tokenService: TibebTokenService) {
    super()
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

  isAuthenticated():Observable<any> {
    return this._tokenService.validateToken().map(
      res =>      {
        return true
      }
    ).catch( error =>   {console.log(error); return Observable.of(false)})
  }


  authenticate(data?: any): Observable<NbAuthResult> {

    return this._tokenService.signIn({
      email: data.email,
      password: data.password
    }).map(
      res =>      {
        console.log(res)
        return new NbAuthResult(
              true,
              res.json(),
              '/pages/dashboard',
              [],
              'successfully logged in')
      }
    ).catch( error =>   {console.log(error); return Observable.of(new NbAuthResult(false))})
  }

  register(data?: any): Observable<NbAuthResult> {

    return this._tokenService.registerAccount(data).map(
      res =>      {
          return new NbAuthResult(
              true,
              res,
              '/pages/dashboard',
              [],
              'successfully logged in'
          )
        }
    ).catch( error =>   {console.log(error); return Observable.of(new NbAuthResult(false))})

  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
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

  protected createDummyResult(data?: any): NbAuthResult {
    if (this.getConfigValue('alwaysFail')) {
      return new NbAuthResult(false,
        this.createFailResponse(data),
        null,
        ['Something went wrong.']);
    }

    return new NbAuthResult(true, this.createSuccessResponse(data), '/', ['Successfully logged in.']);
  }
}
