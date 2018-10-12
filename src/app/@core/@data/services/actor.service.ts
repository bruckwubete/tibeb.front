import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { Actor } from '../models/actor';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ActorService {

  constructor(private http: HttpClient) {
  }

  queryActors(query: String):Observable<Array<Actor>> {
      debugger
      return this.http.get<Array<Actor>>(`http://tibeb-back-bruck.c9users.io/api/v1/actors?${query}`);
  }
}
