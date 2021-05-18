import { AccountService } from './../../accounts/services/account.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { refreshUserDoneAction, refreshUsersAction } from '../actions/user.action';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserEffect {

  constructor(private actions$: Actions, private accountService: AccountService) {
  }

  refreshUsers$ = createEffect(() => this.actions$.pipe(
    ofType(refreshUsersAction),
    switchMap((action) => {
      return this.accountService.GetUsers(action.filter)
        .pipe(
          map((data) => refreshUserDoneAction({ data: data.data}))
        )
      })
  ));
}
