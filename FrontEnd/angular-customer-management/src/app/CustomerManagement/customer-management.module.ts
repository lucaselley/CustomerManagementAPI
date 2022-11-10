import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementComponent } from 'src/app/CustomerManagement/customer-management.component';
import { MaterialModule } from '../shared/material.module';
import { UserLoginComponent } from './components/header/user-login/user-login.component';



@NgModule({
  declarations: [
    CustomerManagementComponent,
    UserLoginComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [
  ]
})
export class CustomerManagementModule { }
