import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Department } from 'src/app/CustomerManagement/models/department.model';
import { DepartmentService } from 'src/app/CustomerManagement/services/department.service';
import { DepartmentsListComponent } from '../departments-list.component';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {

  department: Department = {

  }

  updateForm = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    departmentNr: new FormControl(this.data.departmentNr, Validators.required)
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: Department,
    private dialogRef: MatDialogRef<DepartmentsListComponent>,
    private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.department = { ... this.data }
  }

  submit(): void {
    this.department.name = this.updateForm.value.name!;
    this.department.departmentNr = this.updateForm.value.departmentNr!;

    this.departmentService.update(this.department).subscribe(res => {
      this.dialogRef.close();

      console.log(this.department);
    })
  }

}
