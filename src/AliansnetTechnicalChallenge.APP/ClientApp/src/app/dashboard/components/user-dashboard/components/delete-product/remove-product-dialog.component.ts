import { HelperService } from './../../../../../shared/services/helper.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { deleteProductRequestAction, editProductRequestAction } from 'src/app/dashboard/actions/product.action';
import { ProductState } from 'src/app/dashboard/dashboard.state';
import { AddProductModel } from 'src/app/dashboard/models/products/add-product.model';
import { ProductModel } from 'src/app/dashboard/models/products/product.model';

@Component({
  selector: 'delete-product',
  templateUrl: 'remove-product-dialog.component.html'
})

export class RemoveProductDialog implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  productId: string;

  removeProduct: boolean;
  errors: string[] = [];

  productData$: Observable<ProductState> = this.store.pipe(select(state => state.productState));

  constructor(
    private helperService : HelperService,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<RemoveProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel) { }

  ngOnInit() {
    this.productId = this.data.id;

    this.productData$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(productState => {
      this.errors = productState.errors;

      if (!productState.creatingProduct && this.removeProduct && !productState.errors.length) {
        this.dialogRef.close();
        this.helperService.openSnackbar("Product removed successfully!");
      }
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  doRemoveProduct(){
    this.removeProduct = true;
    this.store.dispatch(deleteProductRequestAction({ id:this.productId }));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
