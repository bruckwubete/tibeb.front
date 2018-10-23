import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from "@angular/common"
import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment'

import { DataEffects } from './effects/data';
import { reducers } from './reducers';
import { DataService } from './services/data.service';
import { Backdrop } from '../@data/components/backdrop/backdrop.component'
import { KitRatingComponent } from '../@data/components/rating/kit-rating.component'
import { MovieViewComponent } from '../@data/components/movie/movie.view.component'

//Containers 
import { MovieViewContainer } from '../@data/containers/movie/movie.view.container'

export const COMPONENTS = [ Backdrop, KitRatingComponent, MovieViewComponent, MovieViewContainer]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NbCheckboxModule,
    NbCardModule,
    NbLayoutModule,
    ThemeModule,
    MomentModule,
    StoreModule.forFeature('data', reducers),
    EffectsModule.forFeature([DataEffects]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreDataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreDataModule,
      providers: [DataService],
    };
  }
}
