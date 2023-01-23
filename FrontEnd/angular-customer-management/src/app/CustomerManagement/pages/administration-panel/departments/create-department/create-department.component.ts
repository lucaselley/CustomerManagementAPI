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
    departmentNr: new FormControl('', [Validators.required]),
    customerRelation: new FormControl(null, Validators.required)
  });

  testData = [{
    "DepartmentNr": "IN-RJ",
    "Name": "Support",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "MM-07",
    "Name": "Support",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "US-FL",
    "Name": "Support",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-GA",
    "Name": "Business Development",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "TL-LA",
    "Name": "Accounting",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "BR-MT",
    "Name": "Accounting",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "CA-BC",
    "Name": "Product Management",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "ZA-NP",
    "Name": "Human Resources",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "CA-BC",
    "Name": "Product Management",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "CA-ON",
    "Name": "Sales",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "KZ-PAV",
    "Name": "Product Management",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "US-CA",
    "Name": "Research and Development",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "VU-SEE",
    "Name": "Services",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "KI-G",
    "Name": "Business Development",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "CN-61",
    "Name": "Product Management",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-CA",
    "Name": "Accounting",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "AU-WA",
    "Name": "Legal",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "CA-MB",
    "Name": "Services",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "CA-MB",
    "Name": "Marketing",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "FR-T",
    "Name": "Training",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-NJ",
    "Name": "Human Resources",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "GL-U-A",
    "Name": "Research and Development",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "PH-LAS",
    "Name": "Business Development",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "YE-HU",
    "Name": "Training",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "CN-42",
    "Name": "Human Resources",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-FL",
    "Name": "Engineering",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "PK-TA",
    "Name": "Product Management",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "CN-53",
    "Name": "Engineering",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "AU-TAS",
    "Name": "Sales",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "ID-PA",
    "Name": "Engineering",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "MG-U",
    "Name": "Human Resources",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "AU-VIC",
    "Name": "Services",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-CA",
    "Name": "Sales",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "PG-CPM",
    "Name": "Support",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "ZW-MW",
    "Name": "Accounting",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "CA-QC",
    "Name": "Legal",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "LK-1",
    "Name": "Human Resources",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "FR-S",
    "Name": "Services",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "PG-WBK",
    "Name": "Product Management",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "US-AK",
    "Name": "Research and Development",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "IN-CT",
    "Name": "Marketing",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "GF-CY",
    "Name": "Research and Development",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-AK",
    "Name": "Engineering",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "CA-BC",
    "Name": "Research and Development",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "CA-NU",
    "Name": "Marketing",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "VE-J",
    "Name": "Human Resources",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "CN-51",
    "Name": "Marketing",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "TL-DI",
    "Name": "Support",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-CO",
    "Name": "Support",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "CL-CO",
    "Name": "Product Management",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "SG-04",
    "Name": "Support",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "AU-NSW",
    "Name": "Human Resources",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-CT",
    "Name": "Sales",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "IL-D",
    "Name": "Human Resources",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "US-DC",
    "Name": "Services",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "DE-NW",
    "Name": "Sales",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-OK",
    "Name": "Engineering",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "GL-U-A",
    "Name": "Marketing",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "MG-M",
    "Name": "Research and Development",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "PH-LUN",
    "Name": "Engineering",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "PG-SAN",
    "Name": "Training",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "IT-88",
    "Name": "Research and Development",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "FI-AL",
    "Name": "Sales",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "AU-SA",
    "Name": "Business Development",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "PG-SAN",
    "Name": "Marketing",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "US-MN",
    "Name": "Engineering",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-AK",
    "Name": "Support",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "IN-MM",
    "Name": "Human Resources",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "FR-G",
    "Name": "Training",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "US-NM",
    "Name": "Marketing",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "PG-EPW",
    "Name": "Support",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "CN-50",
    "Name": "Legal",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "ES-V",
    "Name": "Research and Development",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "MN-053",
    "Name": "Human Resources",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "AU-SA",
    "Name": "Business Development",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "BR-MT",
    "Name": "Business Development",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "ID-PA",
    "Name": "Accounting",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "US-VT",
    "Name": "Business Development",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "PF-U-A",
    "Name": "Engineering",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "US-AK",
    "Name": "Business Development",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "CN-62",
    "Name": "Sales",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "AU-SA",
    "Name": "Sales",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "US-GA",
    "Name": "Legal",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-MN",
    "Name": "Marketing",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "CA-BC",
    "Name": "Product Management",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "ID-SS",
    "Name": "Business Development",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "US-GA",
    "Name": "Marketing",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "GA-2",
    "Name": "Support",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "NP-SE",
    "Name": "Legal",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "BR-RS",
    "Name": "Accounting",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "CA-BC",
    "Name": "Research and Development",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "US-AK",
    "Name": "Engineering",
    "_CustomerRelation": 1
  }, {
    "DepartmentNr": "SE-M",
    "Name": "Research and Development",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "NZ-WGN",
    "Name": "Training",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "PF-U-A",
    "Name": "Services",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "PT-20",
    "Name": "Sales",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "US-AL",
    "Name": "Legal",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "CG-9",
    "Name": "Training",
    "_CustomerRelation": 0
  }, {
    "DepartmentNr": "MX-TAM",
    "Name": "Research and Development",
    "_CustomerRelation": 2
  }, {
    "DepartmentNr": "CN-51",
    "Name": "Engineering",
    "_CustomerRelation": 0
  }]

  constructor(private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<DepartmentsListComponent>) { }

  ngOnInit(): void {
  }



  addTestData() {
    this.testData.forEach(test => {
      let department: Department = {
        name: test.Name,
        departmentNr: test.DepartmentNr.toString(),
        _CustomerRelation: test._CustomerRelation
      }
      this.departmentService.add(department).subscribe(() => {
        this.dialogRef.close();
      })
    })
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
