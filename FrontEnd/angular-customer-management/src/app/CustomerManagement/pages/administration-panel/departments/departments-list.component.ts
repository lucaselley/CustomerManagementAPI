import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/CustomerManagement/models/department.model';
import { DepartmentService } from 'src/app/CustomerManagement/services/department.service';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {

  departments: Department[] = [];

  //create seperate array to filter, so we do not tamper with original mat table data
  filterDepartmentsArray: Department[] = [];


  relationList = [0, 1, 2];

  dataSource = new MatTableDataSource<Department>();
  displayedColumns = ['name', 'departmentNr', 'customerRelation', 'actions'];

  @ViewChild('paginator') private paginator: any = MatPaginator;


  isLoading: boolean = true;


  constructor(private departmentService: DepartmentService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.departmentService.getAll().subscribe(res => {
      this.filterDepartmentsArray = res;
      this.departments = res;
      this.dataSource = new MatTableDataSource(this.departments);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    })
  }

  delete(id: string): void {
    if (confirm("Er du sikker på du vil fjerne denne ?")) {
      this.departmentService.delete(id).subscribe(res => {
        this.getAllDepartments();
      })
    }
  }

  openCreateDialog() {
    this.dialog.open(CreateDepartmentComponent, {
      height: '400px',
      width: '600px',
    }).afterClosed().subscribe(res => {
      this.getAllDepartments();
    })
  }

  openViewDialog(department: Department) {
    this.dialog.open(ViewDepartmentComponent, {
      height: '500px',
      width: '900px',
      data: department
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

  // applyFilterByColumn(event: any) {
  //   let filteredData = this.dataSource.filter(this.filterDepartmentsArray, (item) => {
  //     return item.paymentRelation.toLowerCase() == event.value.toLowerCase();
  //   })
  // }

  applySearchFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
}
