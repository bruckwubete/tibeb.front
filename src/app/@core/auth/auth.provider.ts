import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { NbAbstractAuthProvider, NbAuthResult } from '@nebular/auth';

export interface EtmdbAuthProviderConfig {
  delay?: number;
  alwaysFail?: boolean;
}

@Injectable()
export class EtmdbAuthProvider extends NbAbstractAuthProvider {
  private OauthLoginEndPointUrl = 'https://etmdb.com/api/oauth/token/';
  private clientId ='UM15e3aAhgKGJfKvYmyjos9i5sM4jEsnEVHbkK69';
  private clientSecret ='T7mTk8BI4KHgy8F59rdLiPD5OmzCgWeFi4HWp5htvKMZbnVTH7ymxjMcBjLZyLdx9z61hjLGq3hCii72qJcVK0MIZyxnegoKkI1gD1J7iSASKCpcdJ3bgWoDeZIAPNSA';

  constructor(private http: HttpClient) {
    super()
  }

  protected defaultConfig: EtmdbAuthProviderConfig = {
    delay: 1000,
  };

  authenticate(data?: any): Observable<NbAuthResult> {
    let params: URLSearchParams = new URLSearchParams();
    params.append('username', data.username );
    params.append('password', data.password );
    params.append('client_id', this.clientId );
    params.append('client_secret', this.clientSecret );
    params.append('grant_type', 'password' );

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.OauthLoginEndPointUrl + '?' + params.toString(), {} , {...headers}).map((res) => {
      if (this.getConfigValue('login.alwaysFail')) {
        throw this.createFailResponse(data);
      }

      return res;
    })
    .map((res) => {
      return new NbAuthResult(
        true,
        res,
        '/pages/dashboard',
        [],
        'successfully logged in',
        res['access_token']);
    })
    .catch((res) => {
      let errors = [];
      if (res instanceof HttpErrorResponse) {
        // /errors = this.getConfigValue('errors.getter')('login', res);
        errors.push('Something went wrong.');
      } else {
        errors.push('Something went wrong.');
      }

      return Observable.of(
        new NbAuthResult(
          false,
          res,
          'Failed to login to EtMDB',
          errors,
        ));
    });
  }

  register(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  logout(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
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