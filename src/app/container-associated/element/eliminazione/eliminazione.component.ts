import { Component, OnInit} from '@angular/core';
import { ElementService } from 'src/app/shared/element.service';
import { MatDialogRef } from '@angular/material';
import { Element } from 'src/app/shared/element.model';


@Component({
  selector: 'app-eliminazione',
  templateUrl: './eliminazione.component.html',
  styleUrls: ['./eliminazione.component.css']
})
export class EliminazioneComponent implements OnInit {
  
  /*--------Dichiarazioni Variabili --------------*/
  
  deletedElement : Element;

  /*---------------------------------------------*/  
    
  constructor(private _service : ElementService,
              public dialogRef : MatDialogRef<EliminazioneComponent>
             ) { }
    

  ngOnInit() {
    this.deletedElement = this.dialogRef._containerInstance._config.data;
  }

  /*METODO eliminaElemento
  Questo metodo si collega al service invocando il metodo di delete dell'Api*/
  eliminaElemento(){
 
    this._service.deleteElemento(this.deletedElement);
      this.dialogRef.close();
      //this._service.refreshList();
                    }

  chiudiPopup(){
    this.dialogRef.close();
  }
}

  
