import { Component, OnInit } from '@angular/core';
import { AccountInfo } from '@azure/msal-browser';
import { MsalAuthService } from '../../services/msal-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn?: boolean;

  accountInfo: any;

  constructor(private authService: MsalAuthService) { }

  ngOnInit(): void {
    this.isLoggedIn();

    console.log(this.accountInfo)
  }

  login() {
    this.authService.login();
    this.isLoggedIn();
  }

  logout() {
    this.authService.logout();


  }

  isLoggedIn() {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    if (this.isUserLoggedIn != false) {
      this.accountInfo = this.authService.getActiveAccount();


    }
  }
}
