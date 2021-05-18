import { productsInitialState } from './../../dashboard.state';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { refreshProductsAction } from '../../actions/product.action';
import { ProductState } from '../../dashboard.state';
import { AddProductDialog } from './components/add-product/add-product-dialog.component';
import { EditProductDialog } from './components/edit-product/edit-product-dialog.component';
import { RemoveProductDialog } from './components/delete-product/remove-product-dialog.component';
import { ProductLogDialog } from '../product-log-dialog/product-log-dialog.component';

@Component({
  selector: 'user-dashboard',
  templateUrl: 'user-dashboard.component.html'
})

export class UserDashboardComponent implements OnInit, OnDestroy {

  productData: ProductState = productsInitialState;
  private unsubscribe: Subject<void> = new Subject();

  productData$: Observable<ProductState> = this.store.pipe(select(state => state.productState));

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(refreshProductsAction());

    this.productData$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(productState => {
      this.productData = productState;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialog, {
      width: '600px', height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  openEditDialog(id: string): void {
    const dialogRef = this.dialog.open(EditProductDialog, {
      width: '600px',
      data: this.productData.data.find(c => c.id == id)
    });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(RemoveProductDialog, {
      width: '300px',
      data: this.productData.data.find(c => c.id == id)
    });
  }

  openAuditDialog(id: string): void {
    const dialogRef = this.dialog.open(ProductLogDialog, {
      width: '800px',
      data: this.productData.data.find(c => c.id == id)
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
