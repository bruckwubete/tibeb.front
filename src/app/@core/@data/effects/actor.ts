import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import { ActorService } from '../services/actor.service';

import { Actor, RegisterActorPayload } from '../models/actor';
import * as actorActions from '../actions/actor';

import * as camselCase from 'camelcase-keys'

@Injectable()
export class ActorEffects {

    @Effect()
    login$ = this.actions$.pipe(
      ofType(actorActions.ActorActionTypes.QueryActors),
      map((action: actorActions.QueryActors) => action.payload),
      exhaustMap((queryString: String) =>
        this._actorService
          .queryActors(queryString)
          .pipe(
            map(actor => {
              let actors: Array<Actor> = actor['data'].map(element => {
                let actor: Actor =  camselCase(element)
                actor.id = actor.id["$oid"] || actor.id
                return actor;
              });
              return new actorActions.QueryActorsDone(actors)
            })
            // catchError(error => console.log(error))
          )
      )
    );

  constructor(
    private actions$: Actions,
    private _actorService: ActorService
  ) {}
}
