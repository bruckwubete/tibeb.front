import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromData from '../../@core/@data/reducers';
import * as dataActions from '../../@core/@data/actions/data';

@Component({
  selector: 'etmdb-movies',
  styleUrls: ['./movies.component.scss'],
  templateUrl: './movies.component.html',
})
export class MoviesComponent implements OnInit, OnDestroy {
    private sub: any;
    id: Number;
    movie$ = this.store.pipe(select(fromData.getMoive))

    constructor(private route:ActivatedRoute,  private store: Store<fromData.State>){
      
    }

    ngOnInit() { 
      this.sub = this.route.params.subscribe(params => { 
        this.id = +params['id']
        this.store.dispatch(new dataActions.Get("page[number]=1", 'movie'));
      })
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }
}
