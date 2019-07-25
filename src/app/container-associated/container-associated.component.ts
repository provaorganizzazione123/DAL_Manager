import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { AssociatedService } from './associated.service';
import { MatSnackBar } from '@angular/material';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-container-associated',
  templateUrl: './container-associated.component.html',
  
  styleUrls: ['./container-associated.component.css']
})


export class ContainerAssociatedComponent implements OnInit {
 @Input () contenitoriAperti;   // lista presa in input dall'app.component che contiene la lista dei contenitori che si vogliono aprire
 
 abilitaDisabilita : Boolean = true;  // booleana per abilitare/disabilitare l'editMode
 
 @Output () idContenitoreChiuso= new EventEmitter();    // Id del contenitore che si vuole chiudere inviato in output all'app.component che lo rinvia al component-list.component  
  
 constructor(
              private assService: AssociatedService,
              private snack: MatSnackBar) { }

  ngOnInit() { }

  drop(event: CdkDragDrop<string[]>) {

    // Evento che abilita il drag & drop dei contenitori

    moveItemInArray(this.contenitoriAperti, event.previousIndex, event.currentIndex);
  }

  chiudiContainer(contId) {

    // Metodo che viene eseguito alla chiusura di un contenitore, rimuove dalla pagina il contenitore
    // ed emette in output l'id del contenitore stesso 

    let box = document.getElementById(contId);
     box.parentNode.removeChild(box);
    this.idContenitoreChiuso.emit({id:contId});
    }

    abilitaAssociazione(){ 
      
        // evento scatenato dal click del tasto "Edit"
        // che abilita la selezione degli elementi ed i tasti "Crea Associazione" , "Distruggi Associazione"    
 
    if (this.assService.IdPadreSelezionato != "" && !this.assService.listaIdElementi.includes(this.assService.IdPadreSelezionato)){

      // controllo che avviene al momento del passaggio di modalità (Visual -> Edit) quando c'è gia un padre selezionato,
      // cosi da non perdere l'id del padre già selezionato

      this.assService.listaIdElementi.push(this.assService.IdPadreSelezionato);
    } 
    let tasto = document.getElementById("CreaAss");
    let tasto1 = document.getElementById("DisAss"); 

    if(this.abilitaDisabilita){                             
      // se la booleana è true, abilito l'edit e setto poi la booleana a false

       tasto.hidden=false;
       tasto1.hidden=false;
       this.snack.open("Sei in modalità EDIT","Ho capito");    
       this.abilitaDisabilita = false;}

    else {                                                  
      // se la booleana è false, abilito l'edit e setto poi la booleana a true
       tasto.hidden= true;
       tasto1.hidden = true;   
       this.snack.open("non sei più in modalità EDIT","Ho capito"); 
       this.abilitaDisabilita = true;
       this.assService.EmitSignalComponent(2);    // Emissione segnale per la diselezione degli elementi associati o temporaneamente selezionati in verde
    }
  }

    creaAssociazione(){

      // Metodo che richiama il post dell'associazione nel service al momento del click del tasto "Crea Associazione" 

      this.assService.PostAssociazione()
    }

    distruggiAssociazione(){

       // Metodo che richiama il delete dell'associazione nel service al momento del click del tasto "Distruggi Associazione" 

      this.assService.DeleteAssociazione()
    }
    
    
    caricaListaDistruggiAssociazione(idSelezionato: string){

      // Metodo che crea la lista contenente al primo posto l'id dell'elemento selezionato come padre
      // e in successione gli Id degli elementi che si vuole disassociare 
      // il primo if controlla se è presente un elemento padre e se non è presente lo aggiunge prendendolo dalla proprietà di appoggio IdPadreSelezionato
      // il secondo if controlla se l'id del tasto premuto è gia presente nella lista cosi da aggiungerlo ed emettere il segnale 4 per la routine di evidenziamento Nero 
      // l'else si occupa di rimuovere l'id dalla lista nel caso in cui non si voglia più disassociare quell'elemento ed inviando il segnale 5 lo si evidenzia di nuovo di giallo

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

}
