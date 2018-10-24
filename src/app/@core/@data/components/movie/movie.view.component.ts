import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { environment } from "../../../../../environments/environment";

@Component({
    selector: 'etmdb-movie-view',
    templateUrl: './movie.view.component.html',
    styleUrls: ['./movie.view.component.scss'],
  })
  export class MovieViewComponent implements OnInit {
      voteAverage:number = 0
      directorNames:string = ''
      private movie: Movie;
      constructor(){
      }

      ngOnInit(){
      }

      @Input()
      set movie$(movie: Movie) {
        if(movie && movie != undefined) {
            this.movie = movie;
            this.voteAverage = this.movie.voteAverage;
            console.log(movie)
        }
      }

      getPosterPath(path) {
        return `${environment.origin}/${path}`
      }
  }