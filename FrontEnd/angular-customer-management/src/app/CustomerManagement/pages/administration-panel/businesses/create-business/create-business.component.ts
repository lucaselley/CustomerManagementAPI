import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Business } from 'src/app/CustomerManagement/models/business.model';
import { BusinessService } from 'src/app/CustomerManagement/services/business.service';
import { BusinessListComponent } from '../business-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.css']
})
export class CreateBusinessComponent implements OnInit {

  relationList: number[] = [0, 1, 2];
  cvrPattern = /^[0-9]{8}$/
  durationInSeconds = 5;
  errorMessage: string = '';
  createForm = new FormGroup({
    name: new FormControl('', Validators.required),
    cvRnr: new FormControl('', [Validators.required, Validators.pattern(this.cvrPattern)]),
    customerRelation: new FormControl(null, Validators.required)
  });

  testData = [{
    "cvRnr": 83175363,
    "Name": "Hintz-Rowe",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 42440557,
    "Name": "Bauch LLC",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 90642916,
    "Name": "Adams LLC",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 37215590,
    "Name": "Klocko, Carter and Hudson",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 83516486,
    "Name": "Nikolaus, Torp and Ziemann",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 24123819,
    "Name": "Simonis Group",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 58191450,
    "Name": "Leuschke, Miller and Boehm",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 45382171,
    "Name": "Nader Group",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 89279686,
    "Name": "King-Stanton",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 10529107,
    "Name": "Koepp LLC",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 60576101,
    "Name": "Macejkovic, Goyette and Muller",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 71523263,
    "Name": "Veum, Ryan and Cummerata",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 47219213,
    "Name": "DuBuque, Borer and Trantow",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 16569656,
    "Name": "Schiller, Jast and Paucek",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 57116142,
    "Name": "Hintz Inc",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 43632289,
    "Name": "Simonis and Sons",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 80565035,
    "Name": "Yost, Hilll and Kuvalis",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 49432595,
    "Name": "Kuhn, Gutmann and Kling",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 60633224,
    "Name": "Casper-Ratke",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 28546194,
    "Name": "Blanda-Borer",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 88317144,
    "Name": "O'Conner-Koch",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 27335739,
    "Name": "Rowe Inc",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 95048661,
    "Name": "Toy Group",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 62963095,
    "Name": "Runolfsson-Mohr",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 34886999,
    "Name": "Franecki LLC",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 64369810,
    "Name": "McGlynn-Paucek",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 48927333,
    "Name": "Gutmann Group",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 98774704,
    "Name": "Schinner, Rosenbaum and O'Reilly",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 90285639,
    "Name": "Medhurst, Steuber and Schuppe",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 39944432,
    "Name": "Brakus, Hagenes and Doyle",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 39279551,
    "Name": "Wunsch, Little and Legros",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 16829139,
    "Name": "Kiehn-Cartwright",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 95083446,
    "Name": "Davis, Schroeder and Frami",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 31165355,
    "Name": "Pfeffer Inc",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 72060830,
    "Name": "Baumbach Inc",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 14683894,
    "Name": "Kub, Mann and Casper",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 13978117,
    "Name": "Kovacek, Schoen and Ferry",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 70167328,
    "Name": "Bruen and Sons",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 75277910,
    "Name": "Ledner LLC",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 54105690,
    "Name": "Auer Inc",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 37486593,
    "Name": "Kihn, Parisian and Stroman",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 87123000,
    "Name": "Von Inc",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 52000470,
    "Name": "Treutel-Flatley",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 82828366,
    "Name": "Murazik, Runte and Balistreri",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 37545582,
    "Name": "Haag, VonRueden and Welch",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 21306064,
    "Name": "Bauch-Howell",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 21164919,
    "Name": "Russel, Schowalter and McCullough",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 66123122,
    "Name": "Toy, Becker and Tillman",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 88590017,
    "Name": "O'Kon and Sons",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 68331043,
    "Name": "Kreiger, O'Kon and DuBuque",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 30177869,
    "Name": "Bartoletti, McClure and Smitham",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 75000975,
    "Name": "Ankunding-Effertz",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 14156370,
    "Name": "Gulgowski Group",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 92145851,
    "Name": "Brakus, Lesch and VonRueden",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 14887379,
    "Name": "Reichert-Keebler",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 86026704,
    "Name": "Quitzon, Friesen and Feil",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 62910670,
    "Name": "Von-D'Amore",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 68759300,
    "Name": "Schaden-Lesch",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 70492054,
    "Name": "Beer and Sons",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 92181360,
    "Name": "Thompson-Swift",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 54061863,
    "Name": "Hudson-Beier",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 51071613,
    "Name": "McKenzie LLC",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 45647978,
    "Name": "Kuhn, Dare and Stracke",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 93302862,
    "Name": "Wolff LLC",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 99911912,
    "Name": "Satterfield, Marquardt and Wolf",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 27263433,
    "Name": "Runolfsson, Wyman and Spinka",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 59256277,
    "Name": "Hartmann, Towne and Rippin",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 83153093,
    "Name": "Nolan and Sons",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 84920026,
    "Name": "Waters and Sons",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 64648787,
    "Name": "Kozey Inc",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 84821038,
    "Name": "Rempel, Walker and Jacobs",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 43089154,
    "Name": "Fadel-Rolfson",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 58375940,
    "Name": "Schultz-Langosh",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 81873635,
    "Name": "Wilderman and Sons",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 24542318,
    "Name": "Howell, Braun and Armstrong",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 30261359,
    "Name": "Berge-Walsh",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 35756856,
    "Name": "Toy Group",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 28869492,
    "Name": "Russel-Marquardt",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 48213895,
    "Name": "D'Amore LLC",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 51850865,
    "Name": "Sauer-Weissnat",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 92722663,
    "Name": "Von, Aufderhar and Hammes",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 83215485,
    "Name": "Olson Group",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 32245957,
    "Name": "Kling-Erdman",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 20937237,
    "Name": "Mosciski and Sons",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 60377481,
    "Name": "Pacocha-Bauch",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 15055763,
    "Name": "Klein, Hansen and Schroeder",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 74484296,
    "Name": "Roob-Ondricka",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 76990666,
    "Name": "Cremin Inc",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 16050590,
    "Name": "Murazik, Hills and Hermann",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 89575874,
    "Name": "Jacobs, Green and Morissette",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 60895830,
    "Name": "Schmitt, Walter and Bashirian",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 82278044,
    "Name": "Crona-Bernier",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 40459866,
    "Name": "Steuber and Sons",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 87091385,
    "Name": "Swaniawski, Bauch and Sauer",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 56714711,
    "Name": "Harber-Jakubowski",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 72507027,
    "Name": "Baumbach, VonRueden and Greenfelder",
    "_CustomerRelation": 1
  }, {
    "cvRnr": 83988719,
    "Name": "Labadie, Kunze and Herman",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 21203066,
    "Name": "Collins, Dicki and Reichel",
    "_CustomerRelation": 0
  }, {
    "cvRnr": 87590399,
    "Name": "Beier, Gutkowski and Waelchi",
    "_CustomerRelation": 2
  }, {
    "cvRnr": 44852352,
    "Name": "Walker-Flatley",
    "_CustomerRelation": 2
  }]

  constructor(private businessService: BusinessService,
    private dialogRef: MatDialogRef<BusinessListComponent>,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  addTestData() {
    this.testData.forEach(test => {
      let business: Business = {
        name: test.Name,
        cvRnr: test.cvRnr.toString(),
        _CustomerRelation: test._CustomerRelation
      }
      this.businessService.add(business).subscribe(res => {

      })
    })
  }

  submit(): void {

    let business: Business = {
      name: this.createForm.value.name!,
      cvRnr: this.createForm.value.cvRnr!,
      _CustomerRelation: this.createForm.value.customerRelation!

    };

    this.businessService.add(business).subscribe(res => {
    }, error => {
      this.errorMessage = error?.error?.detail;
      this.snackBar.open(this.errorMessage, "X", {
        duration: this.durationInSeconds * 1000
      });
    }).add(() => {
      this.dialogRef.close();
    })


  }

}
