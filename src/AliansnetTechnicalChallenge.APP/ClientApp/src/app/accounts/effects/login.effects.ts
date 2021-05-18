import { logoutAction } from './../actions/login.action';
import { HelperService } from './../../shared/services/helper.service';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getAuthStatusAction, loginAction, loginFailedAction, loginSuccessAction } from '../actions/login.action';
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { of } from 'rxjs';

@Injectable()
export class LoginEffects {

  constructor(private actions$: Actions, private accountService: AccountService, private helperService: HelperService) {
  }

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap((action) => {
      return this.accountService.Login(action.loginRequestData)
        .pipe(
          map((data) => loginSuccessAction({ loginData: data.data })),
          catchError((err: any) => of(loginFailedAction({ errors: err.error.message == "error" ? err.error.errors : [err.error.message] })))
        )
    })
  ));

  loginUserSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccessAction),
    switchMap(({ loginData }) => {

      this.helperService.SetLocalStorageData("tk", loginData.token)

      this.helperService.SetLocalStorageData("fn", loginData.firstName)
      this.helperService.SetLocalStorageData("ln", loginData.lastName)
      this.helperService.SetLocalStorageData("rm", loginData.role)
      return of(getAuthStatusAction(
        {
          data: { firstName: loginData.firstName,
          lastName : loginData.lastName,
          role : loginData.role, loggedIn: true  }
        }));
    })
  ));

  getAuthStatus$ = createEffect(() => this.actions$.pipe(
    ofType(getAuthStatusAction),
    switchMap(() => {
      return of(this.accountService.GetAuthStatus())
    })
  ), { dispatch: false });





}
