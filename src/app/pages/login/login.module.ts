import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EtmdbLoginComponent } from './login.component';
import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth'


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NbCheckboxModule,
    NbCardModule,
    NbLayoutModule,
    NbAuthModule
  ],
  declarations: [
    EtmdbLoginComponent
  ]
})
export class LoginModule {}