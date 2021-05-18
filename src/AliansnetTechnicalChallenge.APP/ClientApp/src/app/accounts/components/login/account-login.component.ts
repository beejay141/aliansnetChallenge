import { AppState } from './../../../app.state';
import { LoginModel } from './../../models/request/login.model';
import { loginAction, logoutAction } from './../../actions/login.action';
import { AccountState } from './../../account.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'account-login',
  templateUrl: 'account-login.component.html',
  styleUrls: ['./account-login.component.css']
})

export class AccountLoginComponent implements OnInit, OnDestroy {

  authData: AccountState;
  private unsubscribe: Subject<void> = new Subject();

  loginData : LoginModel = {
    email :"",
    password:""
  };

  authData$ : Observable<AccountState> = this.store.pipe(select(state => state.loginState));

  constructor(private store: Store<AppState>, private router : Router) {}

  ngOnInit() {

    this.authData$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(authState=>{
      this.authData = authState;
      if (authState.loggedIn) {
        if (this.authData.data.role == "Worker") {
          this.router.navigate(['/dashboard']);
        }else if(authState.data.role == "Admin"){
            this.router.navigate(['/dashboard/admin']);
        }else{
          this.store.dispatch(logoutAction());
        }
      }
    });
  }


   loginClicked(){
     this.store.dispatch(loginAction({loginRequestData: this.loginData}));
   }


   ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
   }
}
