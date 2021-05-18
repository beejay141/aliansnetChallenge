import { createAction, props } from "@ngrx/store"
import { UserFilterModel } from "../models/users/user-filter.model"
import { UserModel } from "../models/users/user.model"

export const refreshUsersAction = createAction(
  '[account/users] get users',
   props<{ filter: UserFilterModel }>()
)

export const refreshUserDoneAction = createAction(
  '[account/users] get users request completed',
   props<{ data: UserModel[]}>()
)
