import { Component,Output,EventEmitter } from '@angular/core';
import { Contenitore } from './shared/contenitore.model';
import { ElementService } from './shared/element.service';
import { MatDialog, MatDialogConfig} from "@angular/material"
import { InserimentoComponent } from './inserimento/inserimento.component';
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
                public dialog : MatDialog) { }

  ngOnInit () {
    this.service.refreshList();
}

getIdByList(event) {
  /* this.contenitore.emit({id:event.id,nome:event.nome}); */
  this.contenitoriAperti.push({id:event.id,nome:event.nome});
}

cancellaIdDaLista(event) {
  this.idDaCancellare=event.id;
}

inserisciElemento(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;//chiude se clicco fuori dal popup
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(InserimentoComponent, dialogConfig);
  }  
}
