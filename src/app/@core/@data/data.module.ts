import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ActorService } from './services/actor.service';
import { MovieService } from './services/movie.service';
import { ActorEffects } from './effects/actor';
import { MovieEffects } from './effects/movie';
import { reducers } from './reducers';


@NgModule({})
export class CoreDataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootDataModule,
      providers: [ActorService, MovieService],
    };
  }
}

@NgModule({
  imports: [
    CoreDataModule,
    StoreModule.forFeature('data', reducers),
    EffectsModule.forFeature([ActorEffects, MovieEffects]),
  ]
})
export class RootDataModule {}
