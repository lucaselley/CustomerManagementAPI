import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Business } from './models/business.model';
import { BusinessService } from './services/business.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {

  businessList: Business[] = [];

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.businessService.getAll().subscribe(res => {
      this.businessList = res;
    })
  }
}
