import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Element } from 'src/app/shared/element.model';
import { ElementService } from 'src/app/shared/element.service';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.css']
})
export class ModificaComponent implements OnInit {

  constructor(private service : ElementService,
    private _snackBar: MatSnackBar,
    public dialogRef : MatDialogRef<ModificaComponent>) {
    this.service.refreshList();
    this.idPassato=this.dialogRef._containerInstance._config.data;
    this.eleEdit=this.service.list.filter(e => e.IdElemento == this.idPassato);
    this.eleEdit2 = this.eleEdit[0];
    this.service.formData =
    {
      IdElemento : this.eleEdit2.IdElemento,
      NomeElemento : this.eleEdit2.NomeElemento,
      DescrizioneElemento: this.eleEdit2.DescrizioneElemento,
      Id_Contenitore: this.eleEdit2.Id_Contenitore,
    }
    
    
      
     }

    idPassato: number;
    eleEdit: Element[];
    eleEdit2: Element;
  

  ngOnInit() {
    
  }


  onSubmit(form: NgForm){
   this.updateRecord(form);
   this.dialogRef.close();
   
  }


   updateRecord(form:NgForm){
    this.service.putElemento(form.value).subscribe(res => {
      this._snackBar.open('Aggiornamento avvenuto con successo', 'GRANDE');
      this.service.refreshList();
    })
  }
}
