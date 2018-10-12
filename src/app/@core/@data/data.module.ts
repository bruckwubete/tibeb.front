import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ActorService } from './services/actor.service';
import { ActorEffects } from './effects/actor';
import { reducers } from './reducers';


@NgModule({})
export class CoreDataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootDataModule,
      providers: [ActorService],
    };
  }
}

@NgModule({
  imports: [
    CoreDataModule,
    StoreModule.forFeature('data', reducers),
    EffectsModule.forFeature([ActorEffects]),
  ]
})
export class RootDataModule {}
