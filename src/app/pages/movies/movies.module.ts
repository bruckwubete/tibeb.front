import { NgModule } from '@angular/core';
import { MovieRoutingModule, routedComponents } from './movies-routing.module';
import { CoreDataModule } from '../../@core/@data/data.module';

@NgModule({
  imports: [
    MovieRoutingModule,
    CoreDataModule
  ],
  declarations: [
    ...routedComponents
  ]
})
export class MoviesModule { }
