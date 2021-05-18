import { HelperService } from './../../../../../shared/services/helper.service';
import { Component, EventEmitter, Inject, OnInit, Output, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { createRequestProductAction } from 'src/app/dashboard/actions/product.action';
import { ProductState } from 'src/app/dashboard/dashboard.state';
import { AddProductModel } from 'src/app/dashboard/models/products/add-product.model';

@Component({
  selector: 'user-add-product',
  templateUrl: 'add-product-dialog.component.html'
})

export class AddProductDialog implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  product: AddProductModel = {
    name: "",
    price: null
  }

  creatingProduct: boolean;
  errors : string[] = [];

  productData$: Observable<ProductState> = this.store.pipe(select(state => state.productState));

  constructor(
    private helperService : HelperService,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AddProductDialog>) { }

  ngOnInit() {
    this.productData$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(productState => {
      this.errors = productState.errors;

      if (!productState.creatingProduct && this.creatingProduct && !productState.errors.length) {
        this.dialogRef.close();
        this.helperService.openSnackbar("Product added successfully!");
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  doCreateProduct() {
    this.creatingProduct = true;
    this.store.dispatch(createRequestProductAction({ data: this.product }));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }



}


// @Component({
//   selector: 'dialog-overview-example-dialog',
//   template: `<h1 mat-dialog-title>Hi {{data.name}}</h1>
//   <div mat-dialog-content>
//     <p>What's your favorite animal?</p>
//   </div>
//   <div mat-dialog-actions>
//     <button mat-button (click)="onNoClick()">No Thanks</button>
//     <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
//   </div>`,
// })

// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
