import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-kitten',
  styleUrls: ['./kitten.component.scss'],
  templateUrl: './kitten.component.html',
})
export class KittenComponent implements OnDestroy {
  @Input() item: { title: string, genres: string, poster_image: string, release_date: string, plot: string, ratingPercent: string}

  currentTheme: string;
  themeSubscription: any;

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
