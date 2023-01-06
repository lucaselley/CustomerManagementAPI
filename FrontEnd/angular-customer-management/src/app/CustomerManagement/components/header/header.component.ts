import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountInfo } from '@azure/msal-browser';
import { MsalAuthService } from '../../services/msal-auth.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { environment } from 'src/environments/environment';
import { ChangeDetectionStrategy } from '@angular/core';

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
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    this.isUserAdmin = this.authService.adminCheck();

  }

  login() {
    this.authService.login().then(loginCheck => {
      this.isUserLoggedIn = loginCheck;
      if (this.isUserLoggedIn != false) {
        this.accountInfo = this.authService.getActiveAccount();
      }
    }).finally(() => {
      this.isUserAdmin = this.authService.adminCheck();
    });
  }

  logout() {
    this.authService.logout();
  }


  openUserProfileDialog(accountInfo: any) {
    this.dialog.open(UserProfileComponent, {
      height: '400px',
      width: '400px',
      data: accountInfo
    }).afterClosed();
  }
}
