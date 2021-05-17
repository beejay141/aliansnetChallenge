import { LoginResponse } from "./models/response/login.response";

/// login state
export interface AccountState {
  data : LoginResponse,
  loggedIn : boolean,
  requestingLogin : boolean,
  errors: string[]
}

export const loginInitialState : AccountState = {
 requestingLogin : false,
 loggedIn : false,
 data : null,
 errors: []
}
//////


///// register state
export interface RegisterState {
  success: boolean,
  requesting: boolean,
  errors: string[]
}

export const regInitialState : RegisterState = {
  success : false,
  requesting : false,
  errors : []
}
////


//// auth status state
export interface AuthStatusState {
  loggedIn : boolean,
  firstName : string,
  lastName : string,
  role : string,
}

export const authStatusInitialState : AuthStatusState = {
  loggedIn : false,
  firstName : "",
  lastName : "",
  role : ""
}

/////
