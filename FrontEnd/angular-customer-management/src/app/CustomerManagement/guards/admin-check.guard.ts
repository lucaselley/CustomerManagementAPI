import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { MsalAuthService } from '../services/msal-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCheckGuard implements CanActivate {

  constructor(private msalService: MsalService, private router: Router, private msalAuthService: MsalAuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let adminCheck = this.msalAuthService.adminCheck();

    if (adminCheck) {
      return adminCheck;
    } else return false;
  }

}
