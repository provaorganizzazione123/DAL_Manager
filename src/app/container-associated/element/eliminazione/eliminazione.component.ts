import { Component, OnInit} from '@angular/core';
import { ElementService } from 'src/app/shared/element.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eliminazione',
  templateUrl: './eliminazione.component.html',
  styleUrls: ['./eliminazione.component.css']
})
export class EliminazioneComponent implements OnInit {
  
  
  idFondamentale: number;
  
    
  constructor(private _service : ElementService,
              private toastr: ToastrService,
              public dialogRef : MatDialogRef<EliminazioneComponent>) { }
    

  ngOnInit() {
    this.idFondamentale = this.dialogRef._containerInstance._config.data;
  }

  /*METODO eliminaElemento
  Questo metodo si collega al service invocando il metodo di delete dell'Api*/
  eliminaElemento(){
    this._service.deleteElemento(this.idFondamentale);
      //this.toastr.warning('Risposta del server', 'Elemento elimnato con successo');
      this.dialogRef.close();
      this._service.refreshList();
                    }

  chiudiPopup(){
    this.dialogRef.close();
  }
}

  
