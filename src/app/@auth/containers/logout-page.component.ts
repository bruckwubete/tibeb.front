/**
 * @license
 * Copyright Tibeb. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';

@Component({
  selector: 'nb-logout',
  template: `
      <div>Logging out, please wait...</div>
  `,
  styles: [],
})

export class LogoutPageComponent implements OnInit {
    constructor(private store: Store<fromAuth.State>) {}
    ngOnInit(): void {
      this.store.dispatch(new Auth.Logout())
    }
}
