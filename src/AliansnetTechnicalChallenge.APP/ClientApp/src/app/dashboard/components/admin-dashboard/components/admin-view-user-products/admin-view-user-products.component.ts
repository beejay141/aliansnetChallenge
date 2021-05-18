import { adminUserProductsInitialState, AdminUserProductsListState } from './../../../../dashboard.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { takeUntil } from 'rxjs/operators';
import { clearAdminUserProductsAction, refreshAdminUSerProductsAction } from 'src/app/dashboard/actions/admin-user-products.action';
import { ProductLogDialog } from '../../../product-log-dialog/product-log-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'admin-view-user-products',
  templateUrl: 'admin-view-user-products.component.html'
})

export class AdminViewUserProductComponent implements OnInit, OnDestroy {
  userId: string;
  productsData: AdminUserProductsListState = adminUserProductsInitialState;
  private unsubscribe: Subject<void> = new Subject();

  productData$: Observable<AdminUserProductsListState> = this.store.pipe(select(state => state.adminUserProductsState));

  constructor(public dialog: MatDialog, private store: Store<AppState>, public route: ActivatedRoute, public router: Router) {
    route.params.subscribe(param => {
      let user = param['id'];
      if (user == '' || user == undefined) {
        router.navigate(['/dashboard/admin']);
      }
      this.userId = user
    })
  }

  ngOnInit() {

    this.store.dispatch(refreshAdminUSerProductsAction({ userID: this.userId }));

    this.productData$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(productState => {
      this.productsData = productState;
    });

  }

  openAuditDialog(id: string): void {
    const dialogRef = this.dialog.open(ProductLogDialog, {
      width: '800px',
      data: this.productsData.data.find(c => c.id == id)
    });
  }

  ngOnDestroy() {
    this.store.dispatch(clearAdminUserProductsAction());
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
