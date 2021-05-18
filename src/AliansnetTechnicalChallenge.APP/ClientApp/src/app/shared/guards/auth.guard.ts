import { AccountService } from './../../accounts/services/account.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate() {
    let authData = this.accountService.GetAuthStatus();

    if (authData.loggedIn && authData.role == "Worker") {
      return true;
    } else if (authData.loggedIn && authData.role == "Admin") {
      window.location.href = '/dashboard/admin';
    } else {
      this.accountService.LogOut();
    }
    return false;
  }
}
