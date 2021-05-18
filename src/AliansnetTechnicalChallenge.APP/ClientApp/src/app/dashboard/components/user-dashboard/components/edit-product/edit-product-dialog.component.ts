import { HelperService } from './../../../../../shared/services/helper.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { editProductRequestAction } from 'src/app/dashboard/actions/product.action';
import { ProductState } from 'src/app/dashboard/dashboard.state';
import { AddProductModel } from 'src/app/dashboard/models/products/add-product.model';
import { ProductModel } from 'src/app/dashboard/models/products/product.model';

@Component({
  selector: 'user-edit-product',
  templateUrl: 'edit-product-dialog.component.html'
})

export class EditProductDialog implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  product: AddProductModel = {
    name: "",
    price: null
  }

  productId: string;

  editingProduct: boolean;
  errors: string[] = [];

  productData$: Observable<ProductState> = this.store.pipe(select(state => state.productState));

  constructor(
    private helperService : HelperService,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<EditProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel) { }

  ngOnInit() {
    this.productId = this.data.id;

    this.product = {
      name: this.data.name,
      price: this.data.price
    }


    this.productData$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(productState => {
      this.errors = productState.errors;

      if (!productState.creatingProduct && this.editingProduct && !productState.errors.length) {
        this.dialogRef.close();
        this.helperService.openSnackbar("Product updated successfully!");
      }
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  doEditProduct(){
    this.editingProduct = true;
    this.store.dispatch(editProductRequestAction({ id:this.productId,data: this.product }));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
