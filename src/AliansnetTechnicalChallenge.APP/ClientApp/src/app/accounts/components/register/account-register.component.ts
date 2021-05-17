import { registerAction } from './../../actions/register.action';
import { RegisterModel } from './../../models/request/register.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable, Subject } from 'rxjs';
import { RegisterState } from '../../account.state';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'account-register',
  templateUrl: 'account-register.component.html',
  styleUrls: ['./account-register.component.css']
})

export class AccountRegisterComponent implements OnInit, OnDestroy {

  regData: RegisterState;
  private unsubscribe: Subject<void> = new Subject();

  registerRequest: RegisterModel = {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: ""
  };

  regData$: Observable<RegisterState> = this.store.pipe(select(state => state.regState));

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.regData$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(regState=>{
      this.regData = regState;
    });
  }

  doCreateUser(){
    this.store.dispatch(registerAction({registerRequestData: this.registerRequest}));
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
