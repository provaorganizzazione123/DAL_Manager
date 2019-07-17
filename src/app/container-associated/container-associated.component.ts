import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { ElementService } from 'src/app/shared/element.service';
import { Element } from 'src/app/shared/element.model';
import { HttpClient } from '@angular/common/http';
import { AssociatedService } from './associated.service';
import {MatSnackBarModule, MatSnackBar} from '@angular/material';
import {ToastrService } from 'ngx-toastr';
import { Contenitore } from '../shared/contenitore.model';
//import { ToastrService } from 'ngx-toastr';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'tr [app-container-associated]',
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


  chiudiContainer(contId) {
    let box = document.getElementById(contId);
     box.parentNode.removeChild(box);
    this.idContenitoreChiuso.emit({id:contId});
    }

    abilitaAssociazione(){ // evento scatenato dal click del tasto "Edit"
    // che abilita la selezionme degli elementi ed il tasto "Crea Associazione"   
 
    if (this.assService.IdPadreSelezionato != 0 && !this.assService.listaIdElementi.includes(this.assService.IdPadreSelezionato)){

      this.assService.listaIdElementi.push(this.assService.IdPadreSelezionato);
    } 
    let tasto = document.getElementById("CreaAss");  
    if(this.abilitaDisabilita){                             // se la booleana è true, abilito l'edit e setto poi la booleana a false
                                                            // prendo il tasto "crea Associazione"
       tasto.hidden=false;
       this.snack.open("Sei in modalità EDIT","Ho capito");                                  // mostro il tasto settando hidden a false       
       this.abilitaDisabilita = false;}
    else {                                                  // se la booleana è false, abilito l'edit e setto poi la booleana a true
                                                            // prendo il tasto "crea Associazione"
       tasto.hidden= true;   
       this.snack.open("non sei più in modalità EDIT","Ho capito");                               // nascondo il tasto settando hidden a true
       this.abilitaDisabilita = true;
       this.assService.EmitSignalComponent(2);    // Emissione segnale per la diselezione degli elementi associati o temporaneamente selezionati in verde
    }
    }

    creaAssociazione(){

        /*for(let i = 0; i < this.listaIdElementi.length; i++){

        }*/

        this.assService.PostAssociazione()
    }
    
    /* PostAssociazione(listaId: number[]){
      return this.http.post("http://localhost:60537/api/Associazione", this.assService.listaIdElementi);
    } */
    

    aggiungiIdElementoALista(id){
      // metodo che riceve l'id dell'elemento da associare dal componente "element" e lo aggiunge 
      // ad una lista di id da associare

      // Controllo se è stato selezionato un elemento già associato al padre
      if(this.assService.listaFiltroAssociazioni.includes(id)){

      }

      else if (this.assService.listaIdElementi.includes(id)){
        // con questa if controllo se l'id è gia inserito nella lista.
        // siccome l'id già esiste, l'aver cliccato 2 volte sullo stesso elemento,
        // ne comporta la cancellazione dalla lista.
        let indice = this.assService.listaIdElementi.indexOf(id)
        if (indice == 0){
          // Questo if serve a vedere se l'indice dell'id in questione è uguale a 0.
          // Se è uguale a 0 vuol dire che è il primo, e quindi quello che deve essere preso 
          // in considerazione come id del padre. In questo caso quindi, se si clicca di nuovo sull'elemento 
          // padre, non bisogna solo cancellare l'id dalla lista, ma azzerare l'associazione, e quindi 
          // la lista di id.
          this.assService.listaIdElementi = [];
          console.log(this.assService.listaIdElementi)
        }
        else{
          // quindi se l'indice dell'id è diverso da zero, l'id deve essere eliminato dalla lista
        //this.assService.listaIdElementi.splice(this.assService.listaIdElementi.indexOf(id),1);
        console.log(this.assService.listaIdElementi)
        }
      }
      else {
        // se l'id non è presente nella lista, posso procedere con il push dell'id
      this.assService.listaIdElementi.push(id);
      }
      
    }

    mostraLegenda(){
      // metrodo per aprire il tooltip "Legenda", azionato dal mouseOver del tasto "Legenda"
      let div = document.getElementById('legenda');
      div.hidden=false;    
    }
  
    nascondiLegenda(){
      // metodo per chiudere il tooltip "Legenda", azionato dall'evento mouseLeave del tasto "Legenda"
      let div = document.getElementById('legenda');
      div.hidden=true; 
    }
}
