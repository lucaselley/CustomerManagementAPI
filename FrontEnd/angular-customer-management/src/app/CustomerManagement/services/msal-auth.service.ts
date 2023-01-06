import { HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class MsalAuthService {

  constructor(private msalService: MsalService) { }

  adminGroup: any[] = [];

  loginRequest = {
    scopes: ['https://elleyorg.onmicrosoft.com/3c969a20-c0b4-447e-af2a-c14eb2d085ae/read-access']
  }
  //Method to check if a user is logged in
  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  adminCheck(): boolean {
    this.adminGroup = this.msalService.instance.getActiveAccount()?.idTokenClaims?.['groups'] as string[];
    if (this.adminGroup.includes(environment.AzureAdAdminGroup)) {
      return true;
    }
    return false;
  }

  getActiveAccount() {
    return this.msalService.instance.getActiveAccount();
  }

  // Set the account as the one that was just logged in
  async login(): Promise<boolean> {
    let login = this.msalService.loginPopup(this.loginRequest)
    login.subscribe((res: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(res.account);


      console.log(res)
    });

    return await login.toPromise().then(x => {
      console.log("true")
      return this.isLoggedIn();
    }).catch(error => {
      console.log("false")
      return false;
    })
  }




  logout() {
    this.msalService.logoutRedirect();
  }
}
