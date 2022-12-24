import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementComponent } from 'src/app/CustomerManagement/customer-management.component';
import { MaterialModule } from '../shared/material.module';
import { UserProfileComponent } from './components/header/user-profile/user-profile.component';
import { PaymentRelationEnumConvertPipe } from './pipes/payment-relation-enum-convert.pipe';



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
