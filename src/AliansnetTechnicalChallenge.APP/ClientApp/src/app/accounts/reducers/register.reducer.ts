import { registerFailedAction, registerSuccessAction } from './../actions/register.action';
import { createReducer, on } from "@ngrx/store";
import { regInitialState, RegisterState } from "../account.state";
import { registerAction } from "../actions/register.action";


export const registerReducer = createReducer<RegisterState>(regInitialState,
  on(registerAction, (state, _) => ({
    ...state,
    success: false,
    requesting: true,
    errors:[]
  })),
  on(registerSuccessAction, (state, action) => ({
    ...state,
    requesting: false,
    success: true,
    errors: []
  })),
  on(registerFailedAction, (state, action) => ({
    ...state,
    requesting: false,
    errors: action.errors
  })));
