import { AccountState, loginInitialState, regInitialState, RegisterState, AuthStatusState, authStatusInitialState } from './accounts/account.state';
import { adminUserProductsInitialState, AdminUserProductsListState, adminUsersInitialState, AdminUsersListState, productAuditInitialState, ProductAuditState, productsInitialState, ProductState } from './dashboard/dashboard.state';

export interface AppState {
  loginState: AccountState,
  regState: RegisterState,
  authState: AuthStatusState,
  productState : ProductState,
  productAuditState : ProductAuditState,
  adminUserListState : AdminUsersListState,
  adminUserProductsState : AdminUserProductsListState
}

export const InitialState: AppState = {
  loginState: loginInitialState,
  regState: regInitialState,
  authState: authStatusInitialState,
  productState : productsInitialState,
  productAuditState : productAuditInitialState,
  adminUserListState : adminUsersInitialState,
  adminUserProductsState : adminUserProductsInitialState
}
