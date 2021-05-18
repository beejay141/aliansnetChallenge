import { createAction, props } from "@ngrx/store";
import { ProductAuditModel } from "../models/products/product-audit.model";

export const getProductAuditsRequestAction = createAction(
  '[product-audit] get product audits request',
  props<{ id: string }>()
)

export const getProductAuditSuccessAction = createAction(
  '[product-audit] get product audits request success',
  props<{ data: ProductAuditModel[] }>()
)

export const getProductAuditFailedAction = createAction(
  '[product-audit] get product audits request failed',
  props<{ errors: any }>()
)
