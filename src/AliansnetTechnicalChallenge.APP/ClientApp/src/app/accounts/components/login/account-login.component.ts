import { AppState } from './../../../app.state';
import { LoginModel } from './../../models/request/login.model';
import { loginAction } from './../../actions/login.action';
import { AccountState } from './../../account.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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

  constructor(private store: Store<AppState>) {}

  ngOnInit() {

    this.authData$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(authState=>{
      console.log(authState);
      this.authData = authState;
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
