import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerManagementModule } from './CustomerManagement/customer-management.module';
import { AdminPanelModule } from './CustomerManagement/pages/administration-panel/admin-panel.module';
import { MaterialModule } from './shared/material.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerManagementModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
