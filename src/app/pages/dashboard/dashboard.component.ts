import { Component, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie/movie-service.service'
import { environment } from "../../../environments/environment";
import { Store, select } from '@ngrx/store';
import * as fromData from '../../@core/@data/reducers';
import * as actorActions from '../../@core/@data/actions/actor';
import * as movieActions from '../../@core/@data/actions/movie';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers: [MovieService]
})


export class DashboardComponent {
  @ViewChild('carousel') carousel:any;
  movies : Object[] = []
  slides : Array<Object> = []
  options : Object = {
    clicking: true,
    sourceProp: 'src',
    visible: 7,
    perspective: 1,
    startSlide: 0,
    border: 3,
    dir: 'ltr',
    width: 360,
    height: 270,
    space: 220,
    autoRotationSpeed: 5000,
    loop: true
}
  constructor(private $movie: MovieService,  private store: Store<fromData.State>) {
    this.store.dispatch(new actorActions.QueryActors("page[number]=2"));
    this.store.select(fromData.getActors).subscribe(a => console.log(a))

    this.store.dispatch(new movieActions.QueryMovies("page[number]=3"));
    this.store.select(fromData.getMoives).subscribe(a => console.log(a))


    for (var index=1; index<=2; index++) {
      $movie.getMovies(index).subscribe(res => {
        this.movies = this.movies.concat(res['data']);
        let newSlides = new Array<object>()

        res['data'].forEach((item) => {
          newSlides.push({src: `${environment.origin}/${item.images[0]['picture_path']}`})
        })
        this.slides = newSlides.concat(this.slides)
      })
    }
  }

  slideClicked (index) {
    this.carousel.slideClicked(index)
   }
}
