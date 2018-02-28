import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { Angular2TokenService, SignInData, UpdatePasswordData, ResetPasswordData, UserData, AuthData, Angular2TokenOptions } from 'angular2-token';
import {RegisterData} from './RegisterData'
import { Body } from '@angular/http/src/body';

export class TibebTokenService extends Angular2TokenService {
    /**
     *
     * Actions
     *
     */
    registerAccount(registerData: RegisterData): Observable<Response> {
      if (registerData.userType == null)
          this._currentUserType = null;
      else
      this._currentUserType = this._getUserTypeByName(registerData.userType);
      registerData.confirmSuccessUrl = this._options.registerAccountCallback
      return this.makeRequest(this._getApiPath() + this._getUserPath() + this._options.registerAccountPath, registerData);
    }

    makeRequest(url: string, data?:RegisterData) : Observable<Response> {
      return Observable.fromPromise(new Promise((resolve, reject) => {
        let formData: any = new FormData()
        let xhr = new XMLHttpRequest()
        xhr.responseType = 'json'
        const file:File = data.profilePic;

        formData.append("email", data.email)
        formData.append("confirm_success_url", data.confirmSuccessUrl)
        formData.append("confirm_password", data.passwordConfirmation)
        formData.append("name", data.name)
        formData.append("password", data.password)
        formData.append("profile_pic", file, file['name'])
        formData.append("user_type", data.userType)

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.response)
                }
            }
        }
        xhr.open("POST", url, true)
        xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
        xhr.send(formData)
        return Observable.of(xhr)
    }));
    }
}
