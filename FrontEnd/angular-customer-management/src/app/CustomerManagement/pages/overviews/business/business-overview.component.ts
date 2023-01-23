import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Business } from 'src/app/CustomerManagement/models/business.model';
import { BusinessService } from 'src/app/CustomerManagement/services/business.service';

@Component({
  selector: 'app-business-overview',
  templateUrl: './business-overview.component.html',
  styleUrls: ['./business-overview.component.css']
})
export class BusinessOverviewComponent implements OnInit {

  businesses: Business[] = [];
  dataSource = new MatTableDataSource<Business>();
  displayedColumns = ['name', 'CVRnr', 'customerRelation', 'added'];

  @ViewChild('paginator') private paginator: any = MatPaginator;


  isLoading: boolean = true;

  constructor(private businessService: BusinessService) {

  }

  ngOnInit(): void {
    this.getAllBusinesses();
  }

  getAllBusinesses() {
    this.isLoading = true;
    this.businessService.getAll().subscribe(res => {
      this.businesses = res;

      this.dataSource = new MatTableDataSource(this.businesses);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  applySearchFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

}
