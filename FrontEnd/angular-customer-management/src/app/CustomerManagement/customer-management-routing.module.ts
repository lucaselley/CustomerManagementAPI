import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: "admin-panel", loadChildren: () => import('../CustomerManagement/pages/administration-panel/admin-panel.module').then(mod => mod.AdminPanelModule) }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
