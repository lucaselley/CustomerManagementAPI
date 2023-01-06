import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/CustomerManagement/models/department.model';
import { DepartmentService } from 'src/app/CustomerManagement/services/department.service';

@Component({
  selector: 'app-department-overview',
  templateUrl: './department-overview.component.html',
  styleUrls: ['./department-overview.component.css']
})
export class DepartmentOverviewComponent implements OnInit {

  departments: Department[] = [];
  dataSource = new MatTableDataSource<Department>();

  displayedColumns = ['name', 'departmentNr', 'customerRelation', 'added'];

  isLoading: boolean = true;


  constructor(private departmentService: DepartmentService) {

  }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.departmentService.getAll().subscribe(res => {
      this.isLoading = false;
      this.departments = res;

      this.dataSource = new MatTableDataSource(this.departments);
    });
  }

  applySearchFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

}
