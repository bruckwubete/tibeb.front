import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class MovieService {
  private baseUrl: string = '/api/v1/movies';
  constructor(private http: Http) { }

  getMovies(pageNumber: number): Observable<Object[]> {

      return this.http.get(`${this.baseUrl}?page[number]=${pageNumber}`)
                      .map((res: Response) => res.json())
                      .catch((error: any) => {
                        return Observable.throw(error || 'Server error')
                      });

   }
}
