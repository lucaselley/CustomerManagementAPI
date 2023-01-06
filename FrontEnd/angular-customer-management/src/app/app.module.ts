import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular/';
import { MsalInterceptor } from '@azure/msal-angular/';
import { MsalModule } from '@azure/msal-angular/';
import { MsalRedirectComponent } from '@azure/msal-angular/';
import { IPublicClientApplication } from '@azure/msal-browser';
import { PublicClientApplication } from '@azure/msal-browser/dist/app/PublicClientApplication';
import { InteractionType } from '@azure/msal-browser/dist/utils/BrowserConstants';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { loginRequest, msalConfig, protectedResources } from './auth-config';


import { HeaderComponent } from './CustomerManagement/components/header/header.component';
import { CustomerManagementModule } from './CustomerManagement/customer-management.module';
import { MaterialModule } from './shared/material.module';
import { NgxTranslateModule } from './shared/translate/translate.module';


export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(protectedResources.backend.endpoints, protectedResources.backend.scopes);
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  }
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Popup,
    authRequest: loginRequest
  };
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerManagementModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MsalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalGuard,
    MsalService,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent,
    MsalRedirectComponent
  ]
})
export class AppModule { }
