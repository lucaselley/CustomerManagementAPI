import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';


const routes: Routes = [
  { path: "admin-panel", loadChildren: () => import('../CustomerManagement/pages/administration-panel/admin-panel.module').then(mod => mod.AdminPanelModule), canActivate: [MsalGuard] },
  { path: "overviews", loadChildren: () => import('../CustomerManagement/pages/overviews/overview.module').then(mod => mod.OverviewModule), canActivate: [MsalGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
