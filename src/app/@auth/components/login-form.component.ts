// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
// import { AuthenticatePayload } from '../models/user';

// @Component({
//   selector: 'bc-login-form',
//   template: `
//     <div>
//       <div>Login</div>
//       <div>
//         <form [formGroup]="form" (ngSubmit)="submit()">
//           <div>
//             <div>
//               <input type="text" matInput placeholder="Username" formControlName="username">
//             </div>
//           </div>

//           <div>
//             <div>
//               <input type="password" matInput placeholder="Password" formControlName="password">
//             </div>
//           </div>

//           <div *ngIf="errorMessage" class="loginError">
//             {{ errorMessage }}
//           </div>

//           <div class="loginButtons">
//             <button type="submit" mat-button>Login</button>
//           </div>

//         </form>
//       </div>
//     </div>
//   `,
//   styles: [
//     `
//     :host {
//       display: flex;
//       justify-content: center;
//       margin: 72px 0;
//     }

//     .mat-form-field {
//       width: 100%;
//       min-width: 300px;
//     }

//     div,
//     div {
//       display: flex;
//       justify-content: center;
//     }

//     .loginError {
//       padding: 16px;
//       width: 300px;
//       color: white;
//       background-color: red;
//     }

//     .loginButtons {
//       display: flex;
//       flex-direction: row;
//       justify-content: flex-end;
//     }
//   `,
//   ],
// })
// export class LoginFormComponent implements OnInit {
//   @Input()
//   set pending(isPending: boolean) {
//     if (isPending) {
//       this.form.disable();
//     } else {
//       this.form.enable();
//     }
//   }

//   @Input() errorMessage: string | null;

//   @Output() submitted = new EventEmitter<Authenticate>();

//   form: FormGroup = new FormGroup({
//     username: new FormControl(''),
//     password: new FormControl(''),
//   });

//   constructor() {}

//   ngOnInit() {}

//   submit() {
//     if (this.form.valid) {
//       this.submitted.emit(this.form.value);
//     }
//   }
// }


/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '@nebular/auth';
import _ from 'lodash'
import { Component, OnInit, Input, Inject, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticatePayload } from '../models/user';

import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { EtmdbAuthProvider } from '../../@core/auth/auth.provider'

@Component({
  selector: 'tb-login-form',

  template: `
    <nb-auth-block>
      <h2 class="title">Sign In form NGRX BRUCK</h2>
      <small class="form-text sub-title">Hello! Sign in with your email</small>

      <form (ngSubmit)="login()" #form="ngForm" autocomplete="nope">

        <div *ngIf="errorMessage"
             class="alert alert-danger" role="alert">
          <div><strong>Oh snap!</strong></div>
          <div>{{ errorMessage }}</div>
        </div>

        <div *ngIf="loggedIn"
             class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div>You Are Now Successfully Logged In</div>
        </div>

        <div class="form-group">
          <label for="input-email" class="sr-only">Email</label>
          <input name="email" [(ngModel)]="user.usernameEmail" id="input-email"
                 class="form-control" placeholder="Email address" #email="ngModel"
                 [class.form-control-danger]="email.invalid && email.touched" autofocus
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.required">
            Email is required!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors?.pattern">
            Email should be the real one!
          </small>
        </div>

        <div class="form-group">
          <label for="input-password" class="sr-only">Password</label>
          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                 class="form-control" placeholder="Password" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required">
            Password is required!
          </small>
          <small
            class="form-text error"
            *ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">
            Password should contains
            from {{ getConfigValue('forms.validation.password.minLength') }}
            to {{ getConfigValue('forms.validation.password.maxLength') }}
            characters
          </small>
        </div>

        <div class="form-group accept-group col-sm-12">
          <nb-checkbox name="rememberMe" [(ngModel)]="user.rememberMe">Remember me</nb-checkbox>
          <a class="forgot-password" routerLink="../request-password">Forgot Password?</a>
        </div>

        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          Sign In
        </button>
      </form>

      <div class="links">
        <small class="form-text">Or connect with:</small>

        <div class="socials">
          <a href="https://github.com/akveo" target="_blank" class="socicon-github"></a>
          <a href="https://www.facebook.com/akveo/" target="_blank" class="socicon-facebook"></a>
          <a href="https://twitter.com/akveo_inc" target="_blank" class="socicon-twitter"></a>
        </div>

        <small class="form-text">
          Don't have an account? <a routerLink="../register"><strong>Sign Up</strong></a>
        </small>
      </div>
    </nb-auth-block>
  `,
})
export class LoginFormComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(protected service: EtmdbAuthProvider,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
  }

  login(): void {
    this.submitter.emit(this.user);
  }

  getConfigValue(key: string): any {
    return true
  }

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage: string | null;
  @Input() loggedIn: Boolean | null;

  @Output() submitter = new EventEmitter<AuthenticatePayload>();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitter.emit(this.form.value);
    }
  }
}
