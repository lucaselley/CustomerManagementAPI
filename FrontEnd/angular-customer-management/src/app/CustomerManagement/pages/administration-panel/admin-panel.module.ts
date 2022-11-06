import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { DepartmentsListComponent } from './departments/departments-list.component';
import { BusinessListComponent } from './businesses/business-list.component';
import { AdministrationPanelComponent } from './administration-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CreateBusinessComponent } from './businesses/create-business/create-business.component';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';



@NgModule({
  declarations: [
    AdministrationPanelComponent,
    BusinessListComponent,
    DepartmentsListComponent,
    CreateBusinessComponent,
    CreateDepartmentComponent,

  ],
  imports: [
    MaterialModule,
    AdminPanelRoutingModule
  ]
})
export class AdminPanelModule { }
