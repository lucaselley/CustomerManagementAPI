import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { UserLoginComponent } from './components/header/user-login/user-login.component';


const routes: Routes = [
  { path: "admin-panel", loadChildren: () => import('../CustomerManagement/pages/administration-panel/admin-panel.module').then(mod => mod.AdminPanelModule), canActivate: [MsalGuard] },
  { path: "login", component: UserLoginComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
