import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerManagementComponent } from './CustomerManagement/customer-management.component';
import { BusinessListComponent } from './CustomerManagement/pages/businesses/business-list.component';

const routes: Routes = [
  { path: "business", component: BusinessListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
