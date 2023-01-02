import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { BusinessOverviewComponent } from './business/business-overview.component';
import { DepartmentOverviewComponent } from './department/department-overview.component';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  declarations: [
    OverviewComponent,
    BusinessOverviewComponent,
    DepartmentOverviewComponent,
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    MaterialModule
  ]
})
export class OverviewModule { }
