import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    MyDatePickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
