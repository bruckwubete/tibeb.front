import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }
  
  queryData(query: String, model: String):Observable<Object> {
      return this.http.get(`http://tibeb-back-bruck.c9users.io/api/v1/${model}?${query}`);
  }

  getData(id: String, model: String):Observable<Object> {
    return this.http.get(`http://tibeb-back-bruck.c9users.io/api/v1/${model}/${id}`);
}
}
