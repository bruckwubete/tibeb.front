import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {InterceptedHttp} from "../interceptors/http.interceptor";


export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}
