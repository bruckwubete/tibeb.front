import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { Angular2TokenService, SignInData, UpdatePasswordData, ResetPasswordData, UserData, AuthData, Angular2TokenOptions } from 'ngx-token';
import {RegisterData2} from './RegisterData'
import { Body } from '@angular/http/src/body';
import * as snakeCaseKeys from 'snakecase-keys'

export class TibebTokenService extends Angular2TokenService {
    /**
     *
     * Actions
     *
     */

    validateToken() {
        return this.get(this.getUserPath() + this.atOptions.validateTokenPath);
    }
    registerAccount(registerData: RegisterData2): Observable<Response> {
      if (registerData.userType == null)
          this.atCurrentUserType = null;
      else
      this.atCurrentUserType = this.getUserTypeByName(registerData.userType);
      registerData.confirmSuccessUrl = this.atOptions.registerAccountCallback
      return this.makeRequest(this.getApiPath() + this.getUserPath() + this.atOptions.registerAccountPath, registerData);
    }

    makeRequest(url: string, data?:RegisterData2) : Observable<Response> {
      return Observable.fromPromise(new Promise((resolve, reject) => {
        const file:Array<File> = data.profilePic;
        data = snakeCaseKeys(data)
        data['profile_pic'] = file
        let formData: any = this.createFormData(data)
        let xhr = new XMLHttpRequest()
        xhr.responseType = 'json'

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

    createFormData(object: Object, form?: FormData, namespace?: string): FormData {
        const formData = form || new FormData();
        for (let property in object) {
            if (!object.hasOwnProperty(property) && object[property] === null && object[property] === undefined) {
                continue;
            }
            const formKey = namespace ? `${namespace}[${property}]` : property;
            if (object[property] instanceof Date) {
                formData.append(formKey, object[property].toISOString());
            } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
                this.createFormData(object[property], formData, formKey);
            } else if (object[property] instanceof File) {
                formData.append(formKey, object[property], object[property]['name']);
            } else {
                formData.append(formKey, object[property]);
            }
        }
        return formData;
    }
}
