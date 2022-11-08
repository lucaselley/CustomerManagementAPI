import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/CustomerManagement/models/department.model';
import { DepartmentService } from 'src/app/CustomerManagement/services/department.service';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {

  departments: Department[] = [];

  dataSource = new MatTableDataSource<Department>();
  displayedColumns = ['name', 'departmentNr', 'actions'];

  constructor(private departmentService: DepartmentService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.departmentService.getAll().subscribe(res => {
      this.departments = res;

      this.dataSource = new MatTableDataSource(this.departments);

      console.log(this.departments)
    })
  }

  delete(id: string): void {
    this.departmentService.delete(id).subscribe(res => {
      this.getAllDepartments();
    })
  }

  openCreateDialog() {
    this.dialog.open(CreateDepartmentComponent, {
      height: '400px',
      width: '600px',
    }).afterClosed().subscribe(res => {
      this.getAllDepartments();
    })
  }


  openUpdateDialog(department: Department) {
    this.dialog.open(UpdateDepartmentComponent, {
      height: '400px',
      width: '600px',
      data: department
    }).afterClosed().subscribe(res => {
      this.getAllDepartments();
    })
  }
}
