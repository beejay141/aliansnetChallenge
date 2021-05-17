import { LoginResponse } from '../models/response/login.response';
import { LoginModel } from '../models/request/login.model';
import { createAction, props } from "@ngrx/store";
import { LoginStatus } from '../models/login-status.model';

export const loginAction = createAction(
  '[auth/login] login request',
  props<{ loginRequestData: LoginModel }>()
)

export const loginSuccessAction = createAction(
  '[auth/login] login success',
  props<{loginData: LoginResponse}>()
)

export const loginFailedAction = createAction(
  '[auth/login] login failed',
  props<{errors: any}>()
)

export const getAuthStatusAction = createAction(
  '[auth:status] check if the user is logged in',
  props<{data: LoginStatus}>()
)
