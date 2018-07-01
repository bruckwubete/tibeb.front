import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { CollapsibleModule } from 'angular2-collapsible';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    MyDatePickerModule,
    CollapsibleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
