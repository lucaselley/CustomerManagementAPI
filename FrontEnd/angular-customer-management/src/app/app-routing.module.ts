import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './CustomerManagement/components/header/header.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
