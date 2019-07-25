import { Component,Output,EventEmitter } from '@angular/core';
import { Contenitore } from './shared/contenitore.model';
import { ElementService } from './shared/element.service';
import { MatDialog, MatDialogConfig} from "@angular/material"
import { InserimentoComponent } from './inserimento/inserimento.component';
import { InserimentoContenitoreComponent } from './inserimento-contenitore/inserimento-contenitore.component';
import { AssociatedService } from './container-associated/associated.service';
import { ContenitoreService } from './inserimento-contenitore/contenitore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ContainerofList';
  listaContenitori : Contenitore[];
  contenitoriAperti = [];
  idDaCancellare;
  IdChiusuraSignal: EventEmitter<number>;


  @Output() contenitore = new EventEmitter <{id: string, nome: string}> ();
  
  constructor( private service: ElementService,
               private serviceCont: ContenitoreService,
               private assService: AssociatedService,
               public dialog : MatDialog,) {

               this.IdChiusuraSignal = new EventEmitter<number>();
                }

  ngOnInit () {

    // Nell'init si esegue il GET totale degli elementi e delle associazioni

    this.service.refreshList();
    this.assService.GetAssociazione();
}

  getIdByList(event) {

  // Metodo che prende in input il contenitore aperto e lo invia al container-associated.component

  this.contenitoriAperti.push({id:event.id,nome:event.nome, colore:event.colore});
}

cancellaIdDaLista(event) {

  // Metodo che elimina dalla lista l'id del contenitore chiuso e emette il segnale con l'id del contenitore stesso al component-list

  for (let i = 0; i < this.contenitoriAperti.length; i++) {
    
    if(this.contenitoriAperti[i].id == event.id){
      this.contenitoriAperti.splice(i,1);
    }
    
  }

  this.IdChiusuraSignal.emit(event.id);

}

inserisciElemento(){

  // Metodo che apre il dialog di inserimento di un nuovo elemento

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  
  this.dialog.open(InserimentoComponent, dialogConfig);
  }
  
  inserisciContenitore(){

   // Metodo che apre il dialog di inserimento di un nuovo contenitore

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  
  this.dialog.open(InserimentoContenitoreComponent, dialogConfig);
  }

  mostraLegenda(){

      // metrodo per aprire il tooltip "Legenda", azionato dal mouseOver del tasto "Legenda"

      let div = document.getElementById('alert');
      div.style.display="block";    
    }
  
    nascondiLegenda(){

      // metodo per chiudere il tooltip "Legenda", azionato dall'evento mouseLeave del tasto "Legenda"
      
      let div = document.getElementById('alert');
      div.style.display="none"; 
    }

    apriColonna(){
      let chiudi = document.getElementById('chiudiColonna');
      let apri = document.getElementById('apriColonna');
      let contenitore = document.getElementById('work-container');
      let colonna = document.getElementById('colonna');

      chiudi.style.display = "block";
      colonna.style.display = "flex";
      contenitore.style.width = "88%";
      apri.style.display = "none";
    }

    chiudiColonna(){
      let chiudi = document.getElementById('chiudiColonna');
      let apri = document.getElementById('apriColonna');
      let contenitore = document.getElementById('work-container');
      let colonna = document.getElementById('colonna');

      chiudi.style.display = "none";
      colonna.style.display = "none";
      contenitore.style.width = "100%";
      apri.style.display = "block";
      
    }
}
