import { createAction, props } from "@ngrx/store"
import { ProductModel } from "../models/products/product.model"



export const refreshAdminUSerProductsAction = createAction(
  '[products/users] get user"s products',
  props<{ userID: string}>()
)

export const refreshAdminUserProductsDoneAction = createAction(
  '[products/users] get user"s products done',
  props<{ data: ProductModel[]}>()
)

export const clearAdminUserProductsAction = createAction(
  '[products/users] clear admin user products state'
)
