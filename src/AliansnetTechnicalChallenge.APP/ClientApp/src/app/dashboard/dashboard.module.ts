import { AdminAuthGuard } from './../shared/guards/admin-auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddProductDialog } from './components/user-dashboard/components/add-product/add-product-dialog.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import {MatInputModule} from '@angular/material/input';
import { EditProductDialog } from './components/user-dashboard/components/edit-product/edit-product-dialog.component';
import { RemoveProductDialog } from './components/user-dashboard/components/delete-product/remove-product-dialog.component';
import { ProductLogDialog } from './components/product-log-dialog/product-log-dialog.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AdminViewUserProductComponent } from './components/admin-dashboard/components/admin-view-user-products/admin-view-user-products.component';

const routes: Routes = [
  {path : '', component: DashboardComponent, children:[
    {path: 'admin/user/:id/products', component: AdminViewUserProductComponent, canActivate: [AdminAuthGuard] },
    {path: 'admin', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },
    {path:'', component: UserDashboardComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  ]}
]

@NgModule({
  entryComponents:[AddProductDialog,EditProductDialog,RemoveProductDialog,ProductLogDialog],
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
    AddProductDialog,
    EditProductDialog,
    RemoveProductDialog,
    ProductLogDialog,
    AdminDashboardComponent,
    AdminViewUserProductComponent
  ],
  providers: [],
})
export class DashboardModule { }
