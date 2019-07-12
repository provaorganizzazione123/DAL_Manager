import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.css']
})
export class DettaglioComponent implements OnInit {

dettaglio:string;

  constructor(public dialogRef : MatDialogRef<DettaglioComponent>) {
    this.dettaglio = this.dialogRef._containerInstance._config.data
   }

  ngOnInit() {
  }
  chiudiDettaglio(){
    this.dialogRef.close();
  }


}
