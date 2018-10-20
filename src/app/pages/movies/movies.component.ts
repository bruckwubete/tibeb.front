import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { environment } from "../../../environments/environment";
import * as fromData from '../../@core/@data/reducers';
import * as dataActions from '../../@core/@data/actions/data';

@Component({
  selector: 'etmdb-movies',
  styleUrls: ['./movies.component.scss'],
  templateUrl: './movies.component.html',
})
export class MoviesComponent implements OnInit, OnDestroy {
    private sub: any;
    id: String;
    movie$ = this.store.pipe(select(fromData.getMoive))

    constructor(private route:ActivatedRoute,  private store: Store<fromData.State>){
      
    }

    ngOnInit() { 
      this.sub = this.route.params.subscribe(params => { 
        this.id = params['id']
        if (this.id != undefined) {
          this.store.dispatch(new dataActions.Get(`${this.id}`, 'movies'));
        }
      })
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    getPosterPath(path) {
      return `${environment.origin}/${path}`
    }
}
