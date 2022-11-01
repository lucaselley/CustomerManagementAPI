import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementComponent } from 'src/app/CustomerManagement/customer-management.component';
import { BusinessService } from 'src/app/CustomerManagement/services/business.service';
import { AppModule } from '../app.module';



@NgModule({
  declarations: [
    CustomerManagementComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
  ]
})
export class CustomerManagementModule { }
