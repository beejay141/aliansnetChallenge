import { AccountService } from './../../accounts/services/account.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class NonAuthGuard implements CanActivate {

    constructor(private accountService: AccountService,private router: Router) { }

    canActivate(){
      let authData = this.accountService.GetAuthStatus();
        if(authData.loggedIn){
             window.location.href = '/dashboard';
             return false;
        }
        return true;
    }
}
