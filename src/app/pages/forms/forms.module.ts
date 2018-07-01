import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { CollapsibleModule } from 'angular2-collapsible';

@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    MyDatePickerModule,
    CollapsibleModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
