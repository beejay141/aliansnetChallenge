import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { refreshAdminUSerProductsAction, refreshAdminUserProductsDoneAction } from '../actions/admin-user-products.action';
import { ProductService } from '../services/product.service';

@Injectable()
export class AdminUserProductEffect {

  constructor(private actions$: Actions, private productService: ProductService) {
  }

  refreshAdminUserList$ = createEffect(() => this.actions$.pipe(
    ofType(refreshAdminUSerProductsAction),
    switchMap((action) => {
      return this.productService.GetUserProducts(action.userID)
        .pipe(
          map((data) => refreshAdminUserProductsDoneAction({ data: data.data}))
        )
      })
  ));

}
