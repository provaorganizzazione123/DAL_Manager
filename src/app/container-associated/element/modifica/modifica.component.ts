import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Element } from 'src/app/shared/element.model';
import { ElementService } from 'src/app/shared/element.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrls: ['./modifica.component.css']
})
export class ModificaComponent implements OnInit {
  
  eleDaModificare: Element;


  constructor(private service : ElementService,
              private toastr : ToastrService,
              public dialogRef : MatDialogRef<ModificaComponent>)
    {
    this.eleDaModificare=this.dialogRef._containerInstance._config.data;
    
    this.service.formData =
      {
      IdElemento : this.eleDaModificare.IdElemento,
      NomeElemento : this.eleDaModificare.NomeElemento,
      DescrizioneElemento: this.eleDaModificare.DescrizioneElemento,
      Id_Contenitore: this.eleDaModificare.Id_Contenitore,
      }  
    }

  ngOnInit() {
    this.service.populateDropDownList();
  }

  onSubmit(form: NgForm){
   this.updateRecord(form);
   this.dialogRef.close();
  }

  updateRecord(form:NgForm){
    this.service.putElemento(form.value).subscribe(res => {
    this.toastr.info('Risposta del server', 'Aggiornamento avvenuto con successo');
    this.service.refreshList();
    this.service.emetteSegnaleAggiornamento(true);
    })
  }

  chiudiInserimento(){
    this.dialogRef.close();
  }
}