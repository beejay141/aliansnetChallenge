import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { createProductFailedAction as productFailedAction, createRequestProductAction, deleteProductRequestAction, editProductRequestAction, refreshProductDoneAction, refreshProductsAction } from '../actions/product.action';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductEffect {

  constructor(private actions$: Actions, private productService: ProductService) {
  }

  refreshProduct$ = createEffect(() => this.actions$.pipe(
    ofType(refreshProductsAction),
    switchMap(() => {
      return this.productService.GetProducts()
        .pipe(
          map((data) => refreshProductDoneAction({ data: data.data}))
        )
      })
  ));

  createProduct$ = createEffect(() => this.actions$.pipe(
    ofType(createRequestProductAction),
    switchMap((action) => {
      return this.productService.CreateProduct(action.data)
        .pipe(
          map(() => refreshProductsAction()),
          catchError((err: any) => of(productFailedAction({ errors: err.error.message == "error" ? err.error.errors : [err.error.message] })))
        )
    })
  ));

  editProduct$ = createEffect(() => this.actions$.pipe(
    ofType(editProductRequestAction),
    switchMap((action) => {
      return this.productService.EditProduct(action.id,action.data)
        .pipe(
          map(() => refreshProductsAction()),
          catchError((err: any) => of(productFailedAction({ errors: err.error.message == "error" ? err.error.errors : [err.error.message] })))
        )
    })
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProductRequestAction),
    switchMap((action) => {
      return this.productService.RemoveProduct(action.id)
        .pipe(
          map(() => refreshProductsAction()),
          catchError((err: any) => of(productFailedAction({ errors: err.error.message == "error" ? err.error.errors : [err.error.message] })))
        )
    })
  ));



}
