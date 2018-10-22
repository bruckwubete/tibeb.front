import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { MovieRoutingModule, routedComponents } from './movies-routing.module';
import { Backdrop } from './backdrop/backdrop.component'
import { KitRatingComponent } from './rating/kit-rating.component'
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    ThemeModule,
    MovieRoutingModule,
    Ng2SmartTableModule,
    MomentModule
  ],
  declarations: [
    ...routedComponents,
    Backdrop,
    KitRatingComponent
  ]
})
export class MoviesModule { }
