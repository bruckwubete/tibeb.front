import { Component, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie/movie-service.service'
import { environment } from "../../../environments/environment";
import { Store, select } from '@ngrx/store';
import * as fromData from '../../@core/@data/reducers';
import * as dataActions from '../../@core/@data/actions/data';
import { Movie } from '../../services/movie/movie';
import { Observable } from 'rxjs/observable'

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
  movies$ = this.store.pipe(select(fromData.getMoives))
  constructor(private $movie: MovieService,  private store: Store<fromData.State>) {
    this.store.dispatch(new dataActions.QueryData("page[number]=1", 'movies'));
    this.movies$.subscribe((results) => {
      let newSlides = results.map((item) => {
        return new Object({src: `${environment.origin}/${item.images[0]['picPath']}`})
      })    
      this.slides = newSlides.concat(this.slides)
    })
  }

  slideClicked (index) {
    this.carousel.slideClicked(index)
   }
}
