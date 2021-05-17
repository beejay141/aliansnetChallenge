import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddProductDialog } from './components/add-product/add-product-dialog.component';

@Component({
  selector: 'user-dashboard',
  templateUrl: 'user-dashboard.component.html'
})

export class UserDashboardComponent implements OnInit {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit() { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialog, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '600px',
  //     data: {name: this.name, animal: this.animal}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }
}


// @Component({
//   selector: 'dialog-overview-example-dialog',
//   template: `
//       <div class="modal-header">
//         <h5 class="modal-title">Modal title</h5>
//         <button type="button" (click)="onNoClick()" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//       <form class="form-inline mt-10">
//   <div class="form-group mb-2">
//     <label for="name" class="sr-only">Product Name</label>
//     <input type="text" readonly class="form-control-plaintext" id="name" value="email@example.com">
//   </div>
//   <div class="form-group mx-sm-3 mb-2">
//     <label for="inputPassword2" class="sr-only">Password</label>
//     <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
//   </div>
//   <button type="submit" class="btn btn-primary mb-2">Confirm identity</button>
// </form>

//       </div>
//       <div class="modal-footer">
//         <button type="button" [mat-dialog-close]="data.animal" class="btn btn-primary">Save changes</button>
//         <button type="button" (click)="onNoClick()" cdkFocusInitial class="btn btn-secondary" data-dismiss="modal">Close</button>
//     </div>`,
// })

// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
