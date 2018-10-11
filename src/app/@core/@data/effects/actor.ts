import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import { ActorService } from '../services/actor.service';

import { Actor, RegisterActorPayload } from '../models/actor';
import * as actorActions from '../actions/actor';

@Injectable()
export class AuthEffects {

    @Effect()
    login$ = this.actions$.pipe(
      ofType(actorActions.ActorActionTypes.QueryActors),
      map((action: actorActions.QueryActors) => action.payload),
      exhaustMap((payload: String) =>
        this._actorService
          .queryActors(payload)
          .pipe(
            map(actor => new actorActions.QueryActorsDone({ user })),
            catchError(error => {console.log(error); return of(new LoginFailure(error))})
          )
      )
    );

  constructor(
    private actions$: Actions,
    private _actorService: ActorService
  ) {}
}
