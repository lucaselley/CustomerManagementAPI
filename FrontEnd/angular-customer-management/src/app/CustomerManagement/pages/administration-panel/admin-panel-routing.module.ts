import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationPanelComponent } from './administration-panel.component';
import { BusinessListComponent } from './businesses/business-list.component';
import { DepartmentsListComponent } from './departments/departments-list.component';
import { MsalGuard } from '@azure/msal-angular';
import { AdminCheckGuard } from '../../guards/admin-check.guard';



const routes: Routes = [
  {
    path: "admin-panel", component: AdministrationPanelComponent, canActivate: [AdminCheckGuard], children: [
      { path: "business", component: BusinessListComponent },
      { path: "department", component: DepartmentsListComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
