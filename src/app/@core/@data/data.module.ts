import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataEffects } from './effects/data';
import { reducers } from './reducers';
import { DataService } from './services/data.service';


@NgModule({})
export class CoreDataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootDataModule,
      providers: [DataService],
    };
  }
}

@NgModule({
  imports: [
    CoreDataModule,
    StoreModule.forFeature('data', reducers),
    EffectsModule.forFeature([DataEffects]),
  ]
})
export class RootDataModule {}
