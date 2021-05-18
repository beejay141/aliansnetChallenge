import { ProductAuditModel } from "./models/products/product-audit.model";
import { ProductModel } from "./models/products/product.model";
import { UserModel } from "./models/users/user.model";


/// Product state state
export interface ProductState {
  data: ProductModel[],
  creatingProduct: boolean,
  errors: string[]
}

export const productsInitialState: ProductState = {
  creatingProduct: false,
  data: [],
  errors: []
}
//////

/// Product Audit State
export interface ProductAuditState {
  data: ProductAuditModel[],
  requesting: boolean,
  errors: string[]
}

export const productAuditInitialState: ProductAuditState = {
  data: [],
  errors: [],
  requesting: false
}
/////

//// admin users list state
export interface AdminUsersListState {
  data : UserModel[],
  requesting: boolean
}

export const adminUsersInitialState : AdminUsersListState = {
 data : [],
 requesting : false
}
/////

//// admin user products list state
export interface AdminUserProductsListState {
  data : ProductModel[],
  requesting: boolean
}

export const adminUserProductsInitialState : AdminUserProductsListState = {
 data : [],
 requesting : false
}
/////
