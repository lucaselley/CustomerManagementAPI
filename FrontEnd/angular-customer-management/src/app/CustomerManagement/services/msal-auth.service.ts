import { Injectable, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})


export class MsalAuthService {




  constructor(private msalService: MsalService) { }

  loginRequest = {
    scopes: ['https://elleyorg.onmicrosoft.com/3c969a20-c0b4-447e-af2a-c14eb2d085ae/read-access']
  }
  //Method to check if a user is logged in
  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  redirectPromise(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if (res != null && res.account != null) {
          this.msalService.instance.setActiveAccount(res.account)
        }
      }
    )
  }


  getActiveAccount() {
    return this.msalService.instance.getActiveAccount();
  }

  // Set the account as the one that was just logged in
  login() {
    this.msalService.loginPopup(this.loginRequest).subscribe((res: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(res.account);
      console.log(res)
    });
  }


  logout() {
    this.msalService.logout();
  }
}
