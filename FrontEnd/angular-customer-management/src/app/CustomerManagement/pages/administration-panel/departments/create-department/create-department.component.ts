import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Department } from 'src/app/CustomerManagement/models/department.model';
import { DepartmentService } from 'src/app/CustomerManagement/services/department.service';
import { DepartmentsListComponent } from '../departments-list.component';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  relationList: number[] = [0, 1, 2];
  chosenRelation: number = 0;

  createForm = new FormGroup({
    name: new FormControl('', Validators.required),
    departmentNr: new FormControl(null, Validators.required),
    customerRelation: new FormControl(null, Validators.required)
  });
  constructor(private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<DepartmentsListComponent>) { }

  ngOnInit(): void {
  }


  submit(): void {
    let department: Department = {
      name: this.createForm.value.name!,
      departmentNr: this.createForm.value.departmentNr!,
      _CustomerRelation: this.createForm.value.customerRelation!
    };
    console.log(department._CustomerRelation);
    this.departmentService.add(department).subscribe(res => {
      this.dialogRef.close();
    })

    console.log(department)
  }

}
