import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import { DataService } from '../services/data.service';
import { Actor } from '../models/actor';
import { Movie } from '../models/movie';

import { Data, RegisterDataPayload } from '../models/data';
import * as DataActions from '../actions/data';

import * as camselCase from 'camelcase-keys-deep'

@Injectable()
export class DataEffects {

    @Effect()
    getData$ = this.actions$.pipe(
        ofType(DataActions.DataActionTypes.Get),
        map((action: DataActions.Get) => action),
        exhaustMap((action: DataActions.Get) => 
          this._DataService
          .getData(action.payload, action.model)
          .pipe(
              map(data => {
                  switch(action.model.toLowerCase()) {
                      case 'actors': {
                          let actor: Actor = camselCase(data['data'])
                          actor.id = actor.id["$oid"] || actor.id
                          return new DataActions.GetDone(actor, action.model)
                      }
            
                      case 'movies': {
                          let movie: Movie = camselCase(data['data'])
                          movie.id = movie.id["$oid"] || movie.id
                          return new DataActions.GetDone(movie, action.model)
                      }
  
                      default: {
                          console.log("Got unknown data type for Get Action: ", action.payload, action.model)
                          return new DataActions.GetDone([], 'unknown')
                      }
                  }
              })
          )
        )
      )

    @Effect()
    queryData$ = this.actions$.pipe(
      ofType(DataActions.DataActionTypes.QueryData),
      map((action: DataActions.QueryData) => action),
      exhaustMap((action: DataActions.QueryData) => 
        this._DataService
        .queryData(action.payload, action.model)
        .pipe(
            map(data => {
                switch(action.model.toLowerCase()) {
                    case 'actors': {
                        let actors: Array<Actor> = data['data'].map(element => {
                            let actor: Actor =  camselCase(element)
                            actor.id = actor.id["$oid"] || actor.id
                            return actor;
                        });
                        return new DataActions.QueryDataDone(actors, action.model)
                    }
          
                    case 'movies': {
                        let movies: Array<Movie> = data['data'].map(element => {
                            let movie: Movie =  camselCase(element)
                            movie.id = movie.id["$oid"] || movie.id
                            return movie;
                        });
                        return new DataActions.QueryDataDone(movies, action.model)
                    }

                    default: {
                        console.log(action.model.toLowerCase())
                        return new DataActions.QueryDataDone([], 'unknown')
                    }
                }
            })
        )
      )
    )

    constructor(
        private actions$: Actions,
        private _DataService: DataService
    ) {}
}
