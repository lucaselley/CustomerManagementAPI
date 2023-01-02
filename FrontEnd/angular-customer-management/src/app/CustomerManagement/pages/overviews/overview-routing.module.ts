import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BusinessOverviewComponent } from './business/business-overview.component';
import { DepartmentOverviewComponent } from './department/department-overview.component';
import { MsalGuard } from '@azure/msal-angular';
import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {
    path: "overviews", component: OverviewComponent, children: [
      { path: "business", component: BusinessOverviewComponent, canActivate: [MsalGuard] },
      { path: "departments", component: DepartmentOverviewComponent, canActivate: [MsalGuard] }
    ]

  }

]



@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
