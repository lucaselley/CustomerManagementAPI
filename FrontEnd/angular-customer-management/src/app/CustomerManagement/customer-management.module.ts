import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementComponent } from 'src/app/CustomerManagement/customer-management.component';
import { MaterialModule } from '../shared/material.module';
import { UserProfileComponent } from './components/header/user-profile/user-profile.component';



@NgModule({
  declarations: [
    CustomerManagementComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [
  ]
})
export class CustomerManagementModule { }
