import { Component, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie/movie-service.service'
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
  constructor(private $movie: MovieService) {
    for (var index=1; index<=5; index++) {
      $movie.getMovies(index).subscribe(res => {
        this.movies = this.movies.concat(res);
        let newSlides = new Array<object>()

        res.forEach((item) => {
          newSlides.push({src: item['poster_image']})
        })
        this.slides = newSlides.concat(this.slides)
      })
    }
  }

  slideClicked (index) {
    this.carousel.slideClicked(index)
   }
}
