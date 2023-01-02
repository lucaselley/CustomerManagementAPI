import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/CustomerManagement/models/department.model';
import { AuditsService } from 'src/app/CustomerManagement/services/audits.service';
import { DepartmentService } from 'src/app/CustomerManagement/services/department.service';
import { DepartmentsListComponent } from '../departments-list.component';
import { Audit } from 'src/app/CustomerManagement/models/audit.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {

  department: Department = {

  }

  audits: Audit[] = [];

  dataSource = new MatTableDataSource<Audit>();
  displayedColumns = ['time', 'action', 'departmentNr', 'customerRelation', 'actor'];

  isLoading: boolean = true;

  showHistoryPanelClicked: boolean = false;

  viewForm = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    departmentNr: new FormControl(this.data.departmentNr, Validators.required),
    createdDate: new FormControl(this.data.createdDate, Validators.required),
    paymentRelation: new FormControl(this.data._CustomerRelation, Validators.required)
  })

  constructor(@Inject(MAT_DIALOG_DATA) private data: Department,
    private dialogRef: MatDialogRef<DepartmentsListComponent>,
    private departmentService: DepartmentService,
    private auditService: AuditsService) { }

  ngOnInit(): void {

    this.department = { ... this.data };

  }

  showHistory() {
    this.auditService.getAuditByEntityId(this.department.id!).subscribe(res => {
      this.audits = res as Audit[];

      this.dataSource = new MatTableDataSource(this.audits);

      this.isLoading = false;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
