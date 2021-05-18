import { createReducer, on } from "@ngrx/store";
import { clearAdminUserProductsAction, refreshAdminUSerProductsAction, refreshAdminUserProductsDoneAction } from "../actions/admin-user-products.action";
import { adminUserProductsInitialState, AdminUserProductsListState } from "../dashboard.state";



export const adminUserProductListReducer = createReducer<AdminUserProductsListState>(adminUserProductsInitialState,

  on(refreshAdminUSerProductsAction, (state, action) => ({
    ...state,
    requesting: true,
    data: []
  })),
  on(refreshAdminUserProductsDoneAction, (state, action) => ({
    ...state,
    requesting: false,
    data: action.data
  })),
  on(clearAdminUserProductsAction, (state, action) => ({
    ...state,
    requesting: false,
    data: []
  }))

);
