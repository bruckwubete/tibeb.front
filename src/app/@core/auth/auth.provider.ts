import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http} from '@angular/http';
import {HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { NbAbstractAuthProvider, NbAuthResult } from '@nebular/auth';
import { TibebTokenService } from '../../services/overrides/tibeb-token-service';

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
    // const OauthLoginEndPointUrl = 'http://localhost:3000/api/v1/auth/sign_in';
    // let params: URLSearchParams = new URLSearchParams();
    // params.append('email', data.email );
    // params.append('password', data.password );

    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post(OauthLoginEndPointUrl + '?' + params.toString(), {} , {...headers}).map((res) => {
    //   if (this.getConfigValue('login.alwaysFail')) {
    //     throw this.createFailResponse(data);
    //   }

    //   let nbAuthResult = new NbAuthResult(
    //     true,
    //     res.json(),
    //     '/pages/dashboard',
    //     [],
    //     'successfully logged in',
    //     res.headers["_headers"].get("access-token")[0])

    //   //this.tokenService.set(nbAuthResult.getTokenValue())

    //   return nbAuthResult
    // })
    // .catch((res) => {
    //   const errors = [];
    //   if (res instanceof HttpErrorResponse) {
    //     // /errors = this.getConfigValue('errors.getter')('login', res);
    //     errors.push('Something went wrong.');
    //   } else {
    //     errors.push('Something went wrong.');
    //   }

    //   return Observable.of(
    //     new NbAuthResult(
    //       false,
    //       res,
    //       'Failed to login to Tibeb',
    //       errors,
    //     ));
    // });
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
    // const OauthRegisterEndPointUrl = 'http://localhost:3000/api/v1/auth/';
    // let params: URLSearchParams = new URLSearchParams();
    // params.append('email', data.email );
    // params.append('password', data.password );
    // params.append('password_confirmation', data.password );
    // params.append('confirm_success_url', 'http://localhost:4200/#/pages/dashboard' );


    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // return this.http.post(OauthRegisterEndPointUrl + '?' + params.toString(), {} , {...headers})
    // .map((res) => {
    //   if (this.getConfigValue('login.alwaysFail')) {
    //     throw this.createFailResponse(data);
    //   }
    //   console.log(res)
    //   return res.json();
    // })
    // .map((res) => {
    //   return new NbAuthResult(
    //     true,
    //     res,
    //     '/pages/dashboard',
    //     [],
    //     'successfully logged in',
    //     res['access_token']);
    // })
    // .catch((res) => {
    //   const errors = [];
    //   if (res instanceof HttpErrorResponse) {
    //     // /errors = this.getConfigValue('errors.getter')('login', res);
    //     errors.push('Something went wrong.');
    //   } else {
    //     errors.push('Something went wrong.');
    //   }

    //   return Observable.of(
    //     new NbAuthResult(
    //       false,
    //       res,
    //       'Failed to Register to Tibeb',
    //       errors,
    //     ));
    // })


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
