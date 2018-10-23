import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromData from '../../reducers'
import * as Data from '../../actions/data';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'etmdb-show-movie',
    template: `
      <etmdb-movie-view
        [movie]="movie$ | async">
      </etmdb-movie-view>
    `,
    styles: [],
  })
  export class MovieViewContainer implements OnInit {
    private sub: any;
    public id: string;
    movie$ = this.store.pipe(select(fromData.getMoive))

    constructor(private route:ActivatedRoute, private store: Store<fromData.State>) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => { 
            this.id = params['id']
            if (this.id != undefined) {
              this.store.dispatch(new Data.Get(`${this.id}`, 'movies'));
            }
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
  }