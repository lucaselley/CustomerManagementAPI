import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementComponent } from 'src/app/CustomerManagement/customer-management.component';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    CustomerManagementComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [
  ]
})
export class CustomerManagementModule { }
