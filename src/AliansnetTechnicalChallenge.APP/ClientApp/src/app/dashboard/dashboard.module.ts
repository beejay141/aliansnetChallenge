import { AddProductDialog } from './components/user-dashboard/components/add-product/add-product-dialog.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import {MatInputModule} from '@angular/material/input';

const routes: Routes = [
  {path : '', component: DashboardComponent, children:[
    {path:'', component: UserDashboardComponent}
  ]}
]

@NgModule({
  entryComponents:[AddProductDialog],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatDialogModule,
    MatInputModule
  ],
  declarations: [
    DashboardComponent,
    UserDashboardComponent,
    AddProductDialog
  ],
  providers: [],
})
export class DashboardModule { }
