import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { environment } from "../../../../../environments/environment";

@Component({
    selector: 'etmdb-movie-view',
    templateUrl: './movie.view.component.html',
    styleUrls: ['./movie.view.component.scss'],
  })
  export class MovieViewComponent implements OnInit {
      voteAverage = 0
      constructor(){

      }

      ngOnInit(){}

      @Input() movie: Movie | {};

      getPosterPath(path) {
        return `${environment.origin}/${path}`
      }
  }