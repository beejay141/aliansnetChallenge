import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { ProductAuditState } from 'src/app/dashboard/dashboard.state';
import { ProductModel } from 'src/app/dashboard/models/products/product.model';
import { getProductAuditsRequestAction } from '../../actions/product-audit.action';
import { ProductAuditModel } from '../../models/products/product-audit.model';

@Component({
  selector: 'product-log-dialog',
  templateUrl: 'product-log-dialog.component.html'
})

export class ProductLogDialog implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject();

  audits : ProductAuditModel[] = [];

  productId: string;

  errors: string[] = [];
  requesting : boolean = false;
  productName : string = "";

  productAuditData$: Observable<ProductAuditState> = this.store.pipe(select(state => state.productAuditState));

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<ProductLogDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel) { }

  ngOnInit() {
    this.productName = this.data.name;

    this.store.dispatch(getProductAuditsRequestAction({id:this.data.id}))

    this.productAuditData$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(auditState => {
      this.audits = auditState.data;
      this.errors = auditState.errors
      this.requesting = auditState.requesting;
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
