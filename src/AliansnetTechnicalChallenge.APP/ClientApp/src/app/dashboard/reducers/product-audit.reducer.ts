import { createReducer, on } from "@ngrx/store";
import { getProductAuditFailedAction, getProductAuditsRequestAction, getProductAuditSuccessAction } from "../actions/product-audit.action";
import { productAuditInitialState, ProductAuditState } from "../dashboard.state";



export const productAuditReducer = createReducer<ProductAuditState>(productAuditInitialState,
  on(getProductAuditsRequestAction,(state)=>({
    ...state,
    requesting: true,
    data : [],
    errors : []
  })),

  on(getProductAuditSuccessAction, (state, action) => ({
    ...state,
    requesting: false,
    data : action.data,
    errors:[]
  })),

  on(getProductAuditFailedAction, (state, action) => ({
    ...state,
    requesting: false,
    errors: action.errors
  })));
