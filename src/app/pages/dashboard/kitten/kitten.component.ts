import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { environment } from "../../../../environments/environment";
import { Movie } from "../../../@core/@data/models/movie"
@Component({
  selector: 'ngx-kitten',
  styleUrls: ['./kitten.component.scss'],
  templateUrl: './kitten.component.html',
})
export class KittenComponent implements OnDestroy {
  @Input() item:Movie

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

  getPosterPath(item) {
    return `${environment.origin}${item.images[0]['picPath']}`
  }
}
