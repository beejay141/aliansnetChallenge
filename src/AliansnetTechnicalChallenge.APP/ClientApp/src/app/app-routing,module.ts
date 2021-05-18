import { NonAuthGuard } from './shared/guards/non-auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: ()=> import('./accounts/accounts.module').then(mod=>mod.AccountsModule), canActivate: [NonAuthGuard] },
  {path:'dashboard', loadChildren: ()=> import('./dashboard/dashboard.module').then(mod=>mod.DashboardModule) },
  {path:"**", redirectTo:'dashboard'}
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes), HttpClientModule,
    FormsModule,BrowserAnimationsModule],
  exports: [RouterModule,HttpClientModule,
    FormsModule,BrowserAnimationsModule]
})


export class AppRoutingModule { }
