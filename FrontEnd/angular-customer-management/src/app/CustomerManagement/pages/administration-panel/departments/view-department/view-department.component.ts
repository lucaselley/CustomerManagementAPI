import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/CustomerManagement/models/department.model';
import { AuditsService } from 'src/app/CustomerManagement/services/audits.service';
import { DepartmentService } from 'src/app/CustomerManagement/services/department.service';
import { DepartmentsListComponent } from '../departments-list.component';
import { Audit } from 'src/app/CustomerManagement/models/audit.model';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {

  department: Department = {

  }

  audit: Audit = {

  }

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

    console.log(this.department.id)
  }

  showHistory() {
    this.auditService.getAuditByEntityId(this.department.id!).subscribe(res => {
      this.audit = res;
      console.log(res)
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
