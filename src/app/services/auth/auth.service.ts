import { Injectable } from '@angular/core';
import { State } from '../state/state.service';
import { Http , URLSearchParams , Response, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
   private OauthLoginEndPointUrl = 'https://etmdb.com/api/oauth/token/';
   private clientId ='UM15e3aAhgKGJfKvYmyjos9i5sM4jEsnEVHbkK69';
   private clientSecret ='T7mTk8BI4KHgy8F59rdLiPD5OmzCgWeFi4HWp5htvKMZbnVTH7ymxjMcBjLZyLdx9z61hjLGq3hCii72qJcVK0MIZyxnegoKkI1gD1J7iSASKCpcdJ3bgWoDeZIAPNSA';

   constructor(private http: Http, private _state:State) {}

   login(username : string, password :string) : Observable<Object> {

     let params: URLSearchParams = new URLSearchParams();
      params.append('username', username );
      params.append('password', password );
      params.append('client_id', this.clientId );
      params.append('client_secret', this.clientSecret );
      params.append('grant_type', 'password' );

      let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

     return this.http.post(this.OauthLoginEndPointUrl + '?' + params.toString(), {} , options).map(this.handleData)
                    .catch(this.handleError);
   }

   private handleData(res: Response) {
     let body = res.json();
     return body;
   }

   private handleError (error: any) {
     // In a real world app, we might use a remote logging infrastructure
     // We'd also dig deeper into the error to get a better message
     let errMsg = (error.message) ? error.message :
     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
     console.error(errMsg); // log to console instead
     return Observable.throw(errMsg);
   }

   public logout() {
      localStorage.removeItem('token');
      this._state.notifyDataChanged('user.logged_in', false);
   }
}
