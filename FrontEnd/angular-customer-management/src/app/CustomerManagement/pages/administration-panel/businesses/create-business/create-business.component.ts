import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Business } from 'src/app/CustomerManagement/models/business.model';
import { BusinessService } from 'src/app/CustomerManagement/services/business.service';
import { BusinessListComponent } from '../business-list.component';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.css']
})
export class CreateBusinessComponent implements OnInit {

  //TODO: Min/Max length of CVR nr
  createForm = new FormGroup({
    name: new FormControl('', Validators.required),
    CVRnr: new FormControl<number | null>(null, Validators.required)
  });

  constructor(private businessService: BusinessService,
    private dialogRef: MatDialogRef<BusinessListComponent>) { }

  ngOnInit(): void {
  }


  submit(): void {

    let business: Business = {
      name: this.createForm.value.name!,
      CVRnr: this.createForm.value.CVRnr as number
    };

    this.businessService.add(business).subscribe(res => {
      this.dialogRef.close();
    })

    console.log(business)
  }

}
