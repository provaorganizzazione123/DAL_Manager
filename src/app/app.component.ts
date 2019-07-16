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


  @Output() contenitore = new EventEmitter <{id: string, nome: string}> ();
  
  constructor( private service: ElementService,
              private serviceCont: ContenitoreService,
               private assService: AssociatedService,
                public dialog : MatDialog,) { }

  ngOnInit () {
    this.service.refreshList();
    this.assService.GetAssociazione();
}

getIdByList(event) {
  /* this.contenitore.emit({id:event.id,nome:event.nome}); */
  this.contenitoriAperti.push({id:event.id,nome:event.nome, colore:event.colore});
}

cancellaIdDaLista(event) {
  this.idDaCancellare=event.id;
}

resettaidDaCancellare(event){
  // metodo per resettare la variabile "idDaCancellare", in modo che al suo prossimo cambiamento
  // l'onChange del component figlio "component-list" trovi un nuovo valore e quindi si avvia.
  this.idDaCancellare=event;
  
}

inserisciElemento(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  
  this.dialog.open(InserimentoComponent, dialogConfig);
  }
  
  inserisciContenitore(){
    const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  
  this.dialog.open(InserimentoContenitoreComponent, dialogConfig);
  }
 
}
