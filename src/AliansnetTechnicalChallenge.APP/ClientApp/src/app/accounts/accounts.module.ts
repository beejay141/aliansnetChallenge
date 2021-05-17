import { FormsModule } from '@angular/forms';
import { AccountRegisterComponent } from './components/register/account-register.component';
import { AccountLoginComponent } from './components/login/account-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'', component:AccountsComponent, children:[
    {path:'', component : AccountLoginComponent},
    {path:'register', component : AccountRegisterComponent},
  ]}
]

@NgModule({
  declarations: [AccountsComponent, AccountLoginComponent,AccountRegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule,CommonModule,FormsModule],
})
export class AccountsModule { }
