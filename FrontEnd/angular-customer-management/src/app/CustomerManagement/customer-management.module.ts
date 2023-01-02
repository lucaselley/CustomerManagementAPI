import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementComponent } from 'src/app/CustomerManagement/customer-management.component';
import { MaterialModule } from '../shared/material.module';
import { UserProfileComponent } from './components/header/user-profile/user-profile.component';
import { AdminPanelModule } from './pages/administration-panel/admin-panel.module';
import { OverviewModule } from './pages/overviews/overview.module';



@NgModule({
  declarations: [
    CustomerManagementComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminPanelModule,
    OverviewModule
  ]
})
export class CustomerManagementModule { }
