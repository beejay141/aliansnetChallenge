import { createAction, props } from "@ngrx/store";
import { AddProductModel } from "../models/products/add-product.model";
import { ProductFilterModel } from "../models/products/product-filter.model";
import { ProductModel } from "../models/products/product.model";



export const refreshProductsAction = createAction(
  '[user-products] get user"s products',
  props<{filter: ProductFilterModel}>()
)

export const refreshProductDoneAction = createAction(
  '[user-products] get user"s products done',
  props<{ data: ProductModel[]}>()
)

export const createRequestProductAction = createAction(
  '[products/create-new-product] create new product request',
  props<{ data: AddProductModel }>()
)

export const createProductFailedAction = createAction(
  '[products/create-new-product] create new product failed',
  props<{errors: any}>()
)

export const editProductRequestAction = createAction(
  '[Products/update-product] edit product returns',
  props<{id: string,data: AddProductModel}>()
)

export const deleteProductRequestAction = createAction(
  '[Products/remove-product] delete product returns',
  props<{id: string}>()
)
