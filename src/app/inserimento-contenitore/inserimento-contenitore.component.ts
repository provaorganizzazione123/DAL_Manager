import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ContenitoreService } from './contenitore.service'

@Component({
  selector: 'app-inserimento-contenitore',
  templateUrl: './inserimento-contenitore.component.html',
  styleUrls: ['./inserimento-contenitore.component.css']
})
export class InserimentoContenitoreComponent implements OnInit {

  constructor(private serviceCont : ContenitoreService,
              private toastr: ToastrService,
              public dialogRef : MatDialogRef<InserimentoContenitoreComponent>) { }

  ngOnInit() {
    this.resetForm();
   
  }

  resetForm(form?: NgForm){
    if(form != null)
    {
    form.resetForm();
    }
    this.serviceCont.formData =
    {
      Id_Contenitore : null,
      Nome_Contenitore : '',
      Colore_Contenitore :''     
    }
  }
  onSubmit(form: NgForm){    
    this.insertContenitore(form);
    this.dialogRef.close();
    }

    insertContenitore(form:NgForm){
      this.serviceCont.postContenitore(form.value).subscribe(
        res =>{
       // this.serviceCont.filtraLista(form.value.Id_Contenitore);
        this.toastr.success('Risposta del Server', 'Inserimento avvenuto con successo');
        this.resetForm(form);
        this.serviceCont.Aggiornamento(true);      
      }
      )
    }

    chiudiInserimentoContenitore(){
      this.dialogRef.close()
    }
}

