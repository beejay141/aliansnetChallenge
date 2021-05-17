import { getAuthStatusAction, loginFailedAction } from './../actions/login.action';
import { createReducer, on } from '@ngrx/store';
import { AccountState, authStatusInitialState, AuthStatusState, loginInitialState } from '../account.state';
import { loginAction, loginSuccessAction } from '../actions/login.action';
import { LoginResponse } from './../models/response/login.response';
import { state } from '@angular/animations';


export const loginReducer = createReducer<AccountState>(loginInitialState,
  on(loginAction, (state, _) => ({
    ...state,
    requestingLogin: true
  })),
  on(loginSuccessAction, (state, action) => ({
    ...state,
    requestingLogin: false,
    loggedIn: true,
    data: action.loginData,
    errors: []
  })),
  on(loginFailedAction, (state, action) => ({
    ...state,
    requestingLogin: false,
    errors: action.errors
  })));

  export const authStatusReducer = createReducer<AuthStatusState>(authStatusInitialState,
    on(getAuthStatusAction,(state,{data})=>({
      ...state,
      loggedIn : data.loggedIn,
      firstName : data.firstName,
      lastName : data.lastName,
      role : data.role
    })));
