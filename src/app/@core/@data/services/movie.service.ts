import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) {
  }
  
  queryMovies(query: String):Observable<Array<Movie>> {
      return this.http.get<Array<Movie>>(`http://tibeb-back-bruck.c9users.io/api/v1/movies?${query}`);
  }
}
