import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { ElementService } from 'src/app/shared/element.service';
import { Element } from 'src/app/shared/element.model';
import { HttpClient } from '@angular/common/http';
import { AssociatedService } from './associated.service';
import {MatSnackBarModule, MatSnackBar} from '@angular/material';
import {ToastrService } from 'ngx-toastr';
import { Contenitore } from '../shared/contenitore.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
//import { ToastrService } from 'ngx-toastr';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-container-associated',
  templateUrl: './container-associated.component.html',
  
  styleUrls: ['./container-associated.component.css']
})
export class ContainerAssociatedComponent implements OnInit {
 @Input () contenitoriAperti;
 
 listEleCont :Element[];
 prova = document.getElementById('#proviamolo')
 abilitaDisabilita : Boolean = true;  // booleana per abilitare/disabilitare l'editMode
 

 @Output () idContenitoreChiuso= new EventEmitter  ();
  
 constructor( private service: ElementService,
              private assService: AssociatedService,
              private http: HttpClient,
              private snack: MatSnackBar,
              private toastr: ToastrService,) { }

  ngOnInit() { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.contenitoriAperti, event.previousIndex, event.currentIndex);
  }

  chiudiContainer(contId) {
    let box = document.getElementById(contId);
     box.parentNode.removeChild(box);
    this.idContenitoreChiuso.emit({id:contId});
    }

    abilitaAssociazione(){ // evento scatenato dal click del tasto "Edit"
    // che abilita la selezione degli elementi ed il tasto "Crea Associazione"   
 
    if (this.assService.IdPadreSelezionato != "" && !this.assService.listaIdElementi.includes(this.assService.IdPadreSelezionato)){

      this.assService.listaIdElementi.push(this.assService.IdPadreSelezionato);
    } 
    let tasto = document.getElementById("CreaAss");
    let tasto1 = document.getElementById("DisAss");  
    if(this.abilitaDisabilita){                             // se la booleana è true, abilito l'edit e setto poi la booleana a false
                                                            // prendo il tasto "crea Associazione"
       tasto.hidden=false;
       tasto1.hidden=false;
       this.snack.open("Sei in modalità EDIT","Ho capito");                                  // mostro il tasto settando hidden a false       
       this.abilitaDisabilita = false;}
    else {                                                  // se la booleana è false, abilito l'edit e setto poi la booleana a true
       tasto.hidden= true;
       tasto1.hidden = true;   
       this.snack.open("non sei più in modalità EDIT","Ho capito");                               // nascondo il tasto settando hidden a true
       this.abilitaDisabilita = true;
       this.assService.EmitSignalComponent(2);    // Emissione segnale per la diselezione degli elementi associati o temporaneamente selezionati in verde
    }
    }

    creaAssociazione(){
        this.assService.PostAssociazione()
    }

    distruggiAssociazione(){
      this.assService.DeleteAssociazione()
    }
    
    
    caricaListaDistruggiAssociazione(idSelezionato: string){

      if(this.assService.listaDistruggiAssociazione.length == 0){
        this.assService.listaDistruggiAssociazione[0] = this.assService.IdPadreSelezionato
      }

      if(!this.assService.listaDistruggiAssociazione.includes(idSelezionato)){
        this.assService.listaDistruggiAssociazione.push(idSelezionato);
        this.assService.EmitSignalComponent(4);
      
      }
      else{
       this.assService.listaDistruggiAssociazione.splice(this.assService.listaIdElementi.indexOf(idSelezionato),1)
       this.assService.idGiallo = idSelezionato;
       this.assService.EmitSignalComponent(5);     
      }


    }

    // mostraLegenda(){
    //   // metrodo per aprire il tooltip "Legenda", azionato dal mouseOver del tasto "Legenda"
    //   let div = document.getElementById('legenda');
    //   div.hidden=false;    
    // }
  
    // nascondiLegenda(){
    //   // metodo per chiudere il tooltip "Legenda", azionato dall'evento mouseLeave del tasto "Legenda"
    //   let div = document.getElementById('legenda');
    //   div.hidden=true; 
    // }

}
