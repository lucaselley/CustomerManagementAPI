import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Audit } from 'src/app/CustomerManagement/models/audit.model';
import { Business } from 'src/app/CustomerManagement/models/business.model';
import { BusinessListComponent } from '../business-list.component';
import { BusinessService } from 'src/app/CustomerManagement/services/business.service';
import { AuditsService } from 'src/app/CustomerManagement/services/audits.service';

@Component({
  selector: 'app-view-business',
  templateUrl: './view-business.component.html',
  styleUrls: ['./view-business.component.css']
})
export class ViewBusinessComponent implements OnInit {

  business: Business = {

  }

  audits: Audit[] = [];

  dataSource = new MatTableDataSource<Audit>();
  displayedColumns = ['time', 'action', 'cvrNr', 'customerRelation', 'actor'];

  showHistoryPanelClicked: boolean = false;

  viewForm = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    cvrNr: new FormControl(this.data.cvRnr, Validators.required),
    createdDate: new FormControl(this.data.createdDate, Validators.required),
    paymentRelation: new FormControl(this.data._CustomerRelation, Validators.required)
  })

  constructor(@Inject(MAT_DIALOG_DATA) private data: Business,
    private dialogRef: MatDialogRef<BusinessListComponent>,
    private businessService: BusinessService,
    private auditService: AuditsService) {

  }

  ngOnInit(): void {

    this.business = { ... this.data }

  }

  showHistory() {
    this.auditService.getAuditByEntityId(this.business.id!).subscribe(res => {
      this.audits = res as Audit[];
      console.log(this.audits)
      this.dataSource = new MatTableDataSource(this.audits);
    })
  }

  close(): void {
    this.dialogRef.close();
  }

}
