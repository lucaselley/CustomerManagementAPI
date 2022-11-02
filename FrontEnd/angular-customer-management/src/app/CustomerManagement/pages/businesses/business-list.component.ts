import { Component, OnInit } from '@angular/core';
import { Business } from '../../models/business.model';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  businesses: Business[] = [];

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
    this.getAllBusinesses();
  }

  getAllBusinesses() {
    this.businessService.getAll().subscribe(res => {
      this.businesses = res;
      console.log(this.businesses)

    });
  }

}
