import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import { MovieService } from '../services/movie.service';

import { Movie, RegisterMoviePayload } from '../models/movie';
import * as MovieActions from '../actions/movie';

import * as camselCase from 'camelcase-keys'

@Injectable()
export class MovieEffects {

    @Effect()
    login$ = this.actions$.pipe(
      ofType(MovieActions.MovieActionTypes.QueryMovies),
      map((action: MovieActions.QueryMovies) => action.payload),
      exhaustMap((queryString: String) =>
        this._movieService
          .queryMovies(queryString)
          .pipe(
            map(Movie => {
              let movies: Array<Movie> = Movie['data'].map(element => {
                let movie: Movie =  camselCase(element)
                movie.id = movie.id["$oid"] || movie.id
                return Movie;
              });
              return new MovieActions.QueryMoviesDone(movies)
            })
            // catchError(error => console.log(error))
          )
      )
    );

  constructor(
    private actions$: Actions,
    private _movieService: MovieService
  ) {}
}
