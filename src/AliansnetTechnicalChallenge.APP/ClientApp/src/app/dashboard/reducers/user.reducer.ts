import { createReducer, on } from "@ngrx/store";
import { refreshUserDoneAction, refreshUsersAction } from "../actions/user.action";
import { adminUsersInitialState, AdminUsersListState } from "../dashboard.state";


export const adminUserListReducer = createReducer<AdminUsersListState>(adminUsersInitialState,

  on(refreshUsersAction, (state, action) => ({
    ...state,
    requesting: true,
    data: []
  })),
  on(refreshUserDoneAction, (state, action) => ({
    ...state,
    requesting: true,
    data: action.data
  }))

);
