
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
import { AuthenticatePayload, RegisterPayload } from '../models/user';
import { Store, select } from '@ngrx/store';
import * as Auth from '../actions/auth';
import * as fromAuth from '../reducers';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { EtmdbAuthProvider } from '../../@core/auth/auth.provider'

@Component({
  selector: 'tb-register-form',
  styles:[`
    input[type="file"] {
      display: none;
    }

    .custom-file-upload {
      display: inline-block;
      border-radius: 5px;
      padding: 6px 12px;
      cursor: pointer;
      color: white;
      background-image: linear-gradient(to right, #00d9bf, #00d977);
      box-shadow: 0 3px 0 0 #00bb85, 0 2px 8px 0 #00d99b, 0 4px 10px 0 rgba(33, 7, 77, 0.5);
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      border: none;
    }
  `],

  template: `
  <nb-auth-block>
  <h2 class="title">Sign Up</h2>
  <form (ngSubmit)="submit()" #form="ngForm">
  <div *ngIf="errorMessage"  class="alert alert-danger" role="alert">
     <div><strong>Oh snap!</strong></div>
     <div>{{ errorMessage }}</div>
  </div>
  <div *ngIf="registered" class="alert alert-success" role="alert">
     <div><strong>Hooray!</strong></div>
     <div>You Have Successfully Been Registered</div>
  </div>
  <div class="form-group">          <label for="input-name" class="sr-only">Full name</label>          <input name="fullName" [(ngModel)]="user.name" id="input-name" #fullName="ngModel"                 class="form-control" placeholder="Full name"                 [class.form-control-danger]="fullName.invalid && fullName.touched"                 [required]="getConfigValue('forms.validation.fullName.required')"                 [minlength]="getConfigValue('forms.validation.fullName.minLength')"                 [maxlength]="getConfigValue('forms.validation.fullName.maxLength')"                 autofocus>          <small class="form-text error" *ngIf="fullName.invalid && fullName.touched && fullName.errors?.required">            Full name is required!          </small>          <small            class="form-text error"            *ngIf="fullName.invalid && fullName.touched && (fullName.errors?.minlength || fullName.errors?.maxlength)">            Full name should contains            from {{getConfigValue('forms.validation.password.minLength')}}            to {{getConfigValue('forms.validation.password.maxLength')}}            characters          </small>        </div>
  <div class="form-group">          <label for="input-email" class="sr-only">Email address</label>          <input name="email" [(ngModel)]="user.email" id="input-email" #email="ngModel"                 class="form-control" placeholder="Email address" pattern=".+@.+..+"                 [class.form-control-danger]="email.invalid && email.touched"                 [required]="getConfigValue('forms.validation.email.required')">          <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.required">            Email is required!          </small>          <small class="form-text error"                 *ngIf="email.invalid && email.touched && email.errors?.pattern">            Email should be the real one!          </small>        </div>
  <div class="form-group">          <label for="input-password" class="sr-only">Password</label>          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"                 class="form-control" placeholder="Password" #password="ngModel"                 [class.form-control-danger]="password.invalid && password.touched"                 [required]="getConfigValue('forms.validation.password.required')"                 [minlength]="getConfigValue('forms.validation.password.minLength')"                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">          <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required">            Password is required!          </small>          <small            class="form-text error"            *ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">            Password should contains            from {{ getConfigValue('forms.validation.password.minLength') }}            to {{ getConfigValue('forms.validation.password.maxLength') }}            characters          </small>        </div>
  <div class="form-group">          <label for="input-re-password" class="sr-only">Repeat password</label>          <input            name="rePass" [(ngModel)]="user.passwordConfirmation" type="password" id="input-re-password"            class="form-control" placeholder="Confirm Password" #rePass="ngModel"            [class.form-control-danger]="(rePass.invalid || password.value != rePass.value) && rePass.touched"            [required]="getConfigValue('forms.validation.password.required')">          <small class="form-text error"                 *ngIf="rePass.invalid && rePass.touched && rePass.errors?.required">            Password confirmation is required!          </small>          <small            class="form-text error"            *ngIf="rePass.touched && password.value != rePass.value && !rePass.errors?.required">            Password does not match the confirm password.          </small>        </div>
  <div class="form-group">
   <div class="form-control"><label for="input-profile-pic" class="custom-file-upload">Profile Picture</label> <span> &nbsp;{{this.fileName}}</span> </div>
   <input id="input-profile-pic" type="file" (change)="fileChangeEvent($event)"/>
  </div>
  <div class="form-group accept-group col-sm-12" *ngIf="getConfigValue('forms.register.terms')">          <nb-checkbox name="terms" [(ngModel)]="user.terms" [required]="getConfigValue('forms.register.terms')">            Agree to <a href="#" target="_blank"><strong>Terms & Conditions</strong></a>          </nb-checkbox>        </div>
  <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"                [class.btn-pulse]="submitted">          Register        </button>      </form>
  <div class="links">        <small class="form-text">          Already have an account? <a routerLink="../login"><strong>Sign in</strong></a>        </small>      </div>
 </nb-auth-block>
  `,
})
export class RegisterFormComponent {

  user: any = {};
  submitted: boolean = false;
  fileName: String;

  constructor(private store: Store<fromAuth.State>, @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {}) {
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
  @Input() registered: Boolean | null;

  @Output() submitter = new EventEmitter<RegisterPayload>();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {}

  submit() {
    //if (this.form.valid) {
      this.submitter.emit(this.user);
    //}
  }

  getConfigValue(key: string): any {
    return true
  }

  fileChangeEvent(fileInput: any) {
    this.user.profilePic = <File>fileInput.target.files[0];
    this.fileName = fileInput.target.files[0].name
  }
}
