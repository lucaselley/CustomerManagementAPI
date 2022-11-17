import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsalGuard } from '@azure/msal-angular/';
import { MsalInterceptor } from '@azure/msal-angular/';
import { MsalModule } from '@azure/msal-angular/';
import { MsalRedirectComponent } from '@azure/msal-angular/';
import { PublicClientApplication } from '@azure/msal-browser/dist/app/PublicClientApplication';
import { InteractionType } from '@azure/msal-browser/dist/utils/BrowserConstants';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './CustomerManagement/components/header/header.component';
import { CustomerManagementModule } from './CustomerManagement/customer-management.module';
import { AdminPanelModule } from './CustomerManagement/pages/administration-panel/admin-panel.module';
import { MaterialModule } from './shared/material.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerManagementModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminPanelModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth: {
          clientId: environment.azureAd.clientId,
          redirectUri: environment.azureAd.redirectUrl,
          authority: "https://login.microsoftonline.com/" + environment.azureAd.tenantId
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: false
        }
      }
    ),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map(
          [
            ['https://graph.microsoft.com/v1.0/me', ['user.read']]
          ]
        )
      }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent,
    MsalRedirectComponent
  ]
})
export class AppModule { }
