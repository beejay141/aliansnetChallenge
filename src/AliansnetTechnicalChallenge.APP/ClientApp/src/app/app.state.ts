import { AccountState, loginInitialState, regInitialState, RegisterState, AuthStatusState, authStatusInitialState } from './accounts/account.state';

export interface AppState {
  loginState: AccountState,
  regState: RegisterState,
  authState: AuthStatusState
}

export const InitialState: AppState = {
  loginState: loginInitialState,
  regState: regInitialState,
  authState: authStatusInitialState
}
