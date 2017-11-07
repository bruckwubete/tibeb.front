import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class MovieService {
  private baseUrl: string = 'https://etmdb.com/api/v1';
  constructor(private http: Http) { }

  getMovies(pageNumber: number): Observable<Object[]> {

      return this.http.get(`${this.baseUrl}/movie/list/?page=${pageNumber}`)
                      .map((res: Response) => res.json())
                      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

   }
}
