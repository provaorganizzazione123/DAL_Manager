import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ElementService } from '../shared/element.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-inserimento',
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css']
})
export class InserimentoComponent implements OnInit {

  
  constructor(private service : ElementService,
              private _snackBar: MatSnackBar,
              public dialogRef : MatDialogRef<InserimentoComponent>) { } //dialogRef si aggancia al dialog che viene dal AppComponent

  ngOnInit() {
    this.resetForm();
    this.service.populateDropDownList();
    
  }

  resetForm(form?: NgForm){
    if(form != null)
    {
    form.resetForm();
    }
    this.service.formData =
    {
      IdElemento : null,
      NomeElemento : '',
      DescrizioneElemento: '',
      Id_Contenitore: null,
    }
  }

  onSubmit(form: NgForm){
    if(form.value.IdElemento == null){
    this.insertRecord(form);
    this.dialogRef.close();
    }
    else
    {
       this.updateRecord(form);
    }
  }

  insertRecord(form:NgForm){
    this.service.postElemento(form.value).subscribe(
      res => {
        this.service.filtraLista(form.value.Id_Contenitore);
       
        this._snackBar.open('Inserimento avvenuto con successo', 'GRANDE');
        this.resetForm(form);
        this.service.refreshList();
      });
  }
  updateRecord(form:NgForm){
    this.service.putElemento(form.value).subscribe(res => {
      this._snackBar.open('Aggiornamento avvenuto con successo', 'GRANDE');
      this.resetForm(form);
      this.service.refreshList();
    })
  }

  
}
