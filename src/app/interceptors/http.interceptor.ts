import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
import { Angular2TokenService, AuthData } from 'ngx-token';

@Injectable()
export class InterceptedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private updateUrl(req: string) {
        return  environment.origin + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        let atCurrentAuthData = this.getAuthDataFromStorage();

        options.headers.append('access-token', atCurrentAuthData.accessToken)
        options.headers.append('expiry', atCurrentAuthData.expiry)
        options.headers.append('client', atCurrentAuthData.client)
        options.headers.append('token-type', atCurrentAuthData.tokenType)
        options.headers.append('uid', atCurrentAuthData.uid)

        return options;
    }

    // Try to get auth data from storage.
    private getAuthDataFromStorage(): AuthData {
        let authData:AuthData = {
            accessToken:    localStorage.getItem('accessToken'),
            client:         localStorage.getItem('client'),
            expiry:         localStorage.getItem('expiry'),
            tokenType:      localStorage.getItem('tokenType'),
            uid:            localStorage.getItem('uid')
        };
        return authData
    }

}
