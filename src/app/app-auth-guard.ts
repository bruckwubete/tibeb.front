import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { EtmdbAuthProvider } from './@core/auth/auth.provider'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: EtmdbAuthProvider, private router: Router) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
    .do(authenticated => {
      if (!authenticated) {
        this.router.navigate(['auth/login']);
      }
    });
  }
}