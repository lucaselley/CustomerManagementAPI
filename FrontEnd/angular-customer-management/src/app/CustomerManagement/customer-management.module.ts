import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementComponent } from 'src/app/CustomerManagement/customer-management.component';
import { BusinessListComponent } from './pages/businesses/business-list.component';
import { DepartmentsListComponent } from './pages/departments/departments-list.component';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    CustomerManagementComponent,
    BusinessListComponent,
    DepartmentsListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
  ]
})
export class CustomerManagementModule { }
