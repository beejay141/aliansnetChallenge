import { createRequestProductAction, deleteProductRequestAction, editProductRequestAction, refreshProductsAction } from './../actions/product.action';
import { createReducer, on } from "@ngrx/store";
import { createProductFailedAction, refreshProductDoneAction } from "../actions/product.action";
import { productsInitialState, ProductState } from "../dashboard.state";


export const productReducer = createReducer<ProductState>(productsInitialState,
  on(createRequestProductAction,
    editProductRequestAction,
    deleteProductRequestAction,(state)=>({
    ...state,
    creatingProduct: true
  })),

  on(refreshProductDoneAction, (state, action) => ({
    ...state,
    creatingProduct: false,
    data : action.data,
    errors:[]
  })),

  on(createProductFailedAction, (state, action) => ({
    ...state,
    creatingProduct: false,
    errors: action.errors
  })));

