import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { DepartmentsListComponent } from './departments/departments-list.component';
import { BusinessListComponent } from './businesses/business-list.component';
import { AdministrationPanelComponent } from './administration-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CreateBusinessComponent } from './businesses/create-business/create-business.component';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';
import { UpdateBusinessComponent } from './businesses/update-business/update-business.component';
import { UpdateDepartmentComponent } from './departments/update-department/update-department.component';
import { ViewDepartmentComponent } from './departments/view-department/view-department.component';
import { PaymentRelationEnumConvertPipe } from '../../pipes/payment-relation-enum-convert.pipe';



@NgModule({
  declarations: [
    AdministrationPanelComponent,
    BusinessListComponent,
    DepartmentsListComponent,
    CreateBusinessComponent,
    CreateDepartmentComponent,
    UpdateBusinessComponent,
    UpdateDepartmentComponent,
    ViewDepartmentComponent,
    PaymentRelationEnumConvertPipe

  ],
  imports: [
    MaterialModule,
    AdminPanelRoutingModule
  ]
})
export class AdminPanelModule { }
