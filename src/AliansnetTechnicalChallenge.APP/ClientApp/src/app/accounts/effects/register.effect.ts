import { registerAction, registerSuccessAction, registerFailedAction } from './../actions/register.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from '../services/account.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class RegisterEffect {

 constructor(private actions$: Actions, private accountService : AccountService,private router : Router) {
  }

  createUser$ = createEffect(()=> this.actions$.pipe(
    ofType(registerAction),
    switchMap((action)=>{
      return this.accountService.CreateAccount(action.registerRequestData)
      .pipe(
        map(()=> registerSuccessAction({status:true}) ),
        catchError((err : any)=> of(registerFailedAction({errors : err.error.message == "error" ? err.error.errors : [err.error.message] })) )
      )
    })
  ));

  registerUserSuccess$ = createEffect(()=> this.actions$.pipe(
    ofType(registerSuccessAction),
    tap(({status})=>{
      // TODO : add toasty
      this.router.navigate(['/']);
    })
  ),{dispatch:false});

}
