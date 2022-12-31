import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Business } from 'src/app/CustomerManagement/models/business.model';
import { BusinessService } from 'src/app/CustomerManagement/services/business.service';
import { BusinessListComponent } from '../business-list.component';

@Component({
  selector: 'app-update-business',
  templateUrl: './update-business.component.html',
  styleUrls: ['./update-business.component.css']
})
export class UpdateBusinessComponent implements OnInit {

  business: Business = {

  }
  cvrPattern = /^[0-9]{8}$/

  updateForm = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    cvRnr: new FormControl(this.data.cvRnr, [Validators.required, Validators.pattern(this.cvrPattern)]),
    customerRelation: new FormControl(this.data._CustomerRelation, Validators.required)
  });

  relationList = [0, 1, 2];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Business,
    private dialogRef: MatDialogRef<BusinessListComponent>,
    private businessService: BusinessService) { }

  ngOnInit(): void {
    this.business = { ... this.data };
  }


  submit(): void {


    this.business.name = this.updateForm.value.name!;
    this.business.cvRnr = this.updateForm.value.cvRnr!;
    this.business._CustomerRelation = this.updateForm.value.customerRelation!;

    this.businessService.update(this.business).subscribe(res => {
      console.log(this.business)

      this.dialogRef.close();
    })
  }


}
