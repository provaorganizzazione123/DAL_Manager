import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Contenitore } from './shared/contenitore.model';

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
  
  ngOnInit () {
  
}

getIdByList(event) {
  /* this.contenitore.emit({id:event.id,nome:event.nome}); */
  this.contenitoriAperti.push({id:event.id,nome:event.nome});
}

cancellaIdDaLista(event) {
  this.idDaCancellare=event.id;
}

}
