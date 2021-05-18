import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { getProductAuditFailedAction, getProductAuditsRequestAction, getProductAuditSuccessAction } from '../actions/product-audit.action';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductAuditEffect {

  constructor(private actions$: Actions, private productService: ProductService) {
  }

  getAudits$ = createEffect(() => this.actions$.pipe(
    ofType(getProductAuditsRequestAction),
    switchMap((action) => {
      return this.productService.GetProductAudits(action.id)
      .pipe(
        map((data) => getProductAuditSuccessAction({ data: data.data })),
        catchError((err: any) => of(getProductAuditFailedAction({ errors: err.error.message == "error" ? err.error.errors : [err.error.message] })))
      )
      })
  ));

}
