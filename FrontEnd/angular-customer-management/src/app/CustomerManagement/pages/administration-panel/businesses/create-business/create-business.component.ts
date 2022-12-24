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

  relationList: number[] = [0, 1, 2];
  //TODO: Min/Max length of CVR nr
  createForm = new FormGroup({
    name: new FormControl('', Validators.required),
    cvRnr: new FormControl(null, Validators.required),
    customerRelation: new FormControl(null, Validators.required)
  });

  constructor(private businessService: BusinessService,
    private dialogRef: MatDialogRef<BusinessListComponent>) { }

  ngOnInit(): void {
  }


  submit(): void {

    let business: Business = {
      name: this.createForm.value.name!,
      cvRnr: this.createForm.value.cvRnr!,
      _CustomerRelation: this.createForm.value.customerRelation!

    };

    this.businessService.add(business).subscribe(res => {
      this.dialogRef.close();
    })

    console.log(business)
  }

}
