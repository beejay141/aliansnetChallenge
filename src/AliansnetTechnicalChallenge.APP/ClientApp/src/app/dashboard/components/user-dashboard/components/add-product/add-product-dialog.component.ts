import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AddProductModel } from 'src/app/dashboard/models/products/add-product.model';

@Component({
  selector: 'user-add-product',
  templateUrl: 'add-product-dialog.component.html'
})

export class AddProductDialog implements OnInit {

  product : AddProductModel = {
    name: "",
    price: null
  }

  constructor(
    public dialogRef: MatDialogRef<AddProductDialog>) {}

  ngOnInit() { }

    onNoClick(): void {
    this.dialogRef.close();
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
