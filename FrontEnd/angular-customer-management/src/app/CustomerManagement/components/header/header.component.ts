import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountInfo } from '@azure/msal-browser';
import { MsalAuthService } from '../../services/msal-auth.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn?: boolean;
  isUserAdmin?: boolean;
  adminGroup?: any[] = [];

  accountInfo = this.authService.getActiveAccount();

  constructor(private authService: MsalAuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn();
    this.isUserAdmin = this.authService.adminCheck();
    console.log(this.accountInfo)
    console.log((this.accountInfo?.idTokenClaims?.['groups']))
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



  openUserProfileDialog(accountInfo: any) {
    this.dialog.open(UserProfileComponent, {
      height: '400px',
      width: '400px',
      data: accountInfo
    }).afterClosed();
  }
}
