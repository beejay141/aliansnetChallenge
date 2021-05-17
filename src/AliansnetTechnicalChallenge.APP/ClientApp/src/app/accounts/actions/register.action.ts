import { RegisterModel } from './../models/request/register.model';
import { createAction, props } from "@ngrx/store"


export const registerAction = createAction(
  '[Account/create-user] registration request',
  props<{ registerRequestData: RegisterModel }>()
)

export const registerSuccessAction = createAction(
  '[Account/create-user] registered successfully',
  props<{status: boolean}>()
)

export const registerFailedAction = createAction(
  '[Account/create-user] register failed',
  props<{errors: any}>()
)
