import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    MyDatePickerModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
