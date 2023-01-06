import { Component, OnInit } from '@angular/core';
import { MsalAuthService } from '../../services/msal-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private msalAuthService: MsalAuthService) {

  }

  ngOnInit(): void {
  }


}
