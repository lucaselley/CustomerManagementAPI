import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Business } from '../../../models/business.model';
import { BusinessService } from '../../../services/business.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBusinessComponent } from './create-business/create-business.component';
import { UpdateBusinessComponent } from './update-business/update-business.component';


@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  businesses: Business[] = [];

  dataSource = new MatTableDataSource<Business>();
  displayedColumns = ['name', 'CVRnr', 'actions'];


  constructor(private businessService: BusinessService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllBusinesses();
  }

  getAllBusinesses() {
    this.businessService.getAll().subscribe(res => {
      this.businesses = res;

      this.dataSource = new MatTableDataSource(this.businesses);

      console.log(this.businesses)
    });
  }

  delete(id: string) {
    this.businessService.delete(id).subscribe(res => {
      this.getAllBusinesses();
    });
  }

  openCreateDialog() {
    this.dialog.open(CreateBusinessComponent, {
      height: '400px',
      width: '600px',
    }).afterClosed().subscribe(res => {
      this.getAllBusinesses();
    })
  }

  openUpdateDialog(business: Business) {
    this.dialog.open(UpdateBusinessComponent, {
      height: '400px',
      width: '600px',
      data: business
    }).afterClosed().subscribe(res => {
      this.getAllBusinesses();
    })
  }
}
