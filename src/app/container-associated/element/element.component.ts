import { Component, OnInit,Input, EventEmitter, Output, } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { EliminazioneComponent } from './eliminazione/eliminazione.component';
import { ModificaComponent } from './modifica/modifica.component';
import { Element } from 'src/app/shared/element.model';
import { ElementService } from 'src/app/shared/element.service';


@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})

export class ElementComponent implements OnInit {

@Input() idContenitoreAperto;
@Input() listaElementi;

elemento:Element;

  constructor( private service : ElementService,
               public dialog : MatDialog) { }

  ngOnInit() {

  
    this.listaElementi.forEach(element => {
      if (element.id == this.idContenitoreAperto){
           this.elemento=element.l;
      } 
     });
    }
    
    /* Metodo DeleteElemento ----> """"" scaturito dal click sui bottoni X degli elementi """"
    Questo metodo crea una Dialog facendo partire il component Figlio --> EliminazioneComponent
    passando l'id dell'elemento da cancellare tramite dialogConfig.data e passando 
    l'intero oggetto dialogConfig per fargli vedere la proprietà */
    DeleteElemento(idEle:number){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.data = idEle;
      this.dialog.open(EliminazioneComponent,  dialogConfig ); 
    }

    
    /*Funzione modifica elemento, generiamo un popup(dialogConfig), generando un nuovo component */

    ModificaElemento(ele:Element){
      const dialogConfig =new MatDialogConfig();
      dialogConfig.disableClose= false;
      dialogConfig.autoFocus=true;
      dialogConfig.width="60%";
      dialogConfig.data= ele;
      this.dialog.open(ModificaComponent, dialogConfig);

    }

}