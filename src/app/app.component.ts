import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ContainerofList';
  listaContenitori = [];
  contenitoriAperti = [];
  idDaCancellare;


  @Output() contenitore = new EventEmitter <{id: string, nome: string}> ();

  ngOnInit () {
  this.listaContenitori = [
    {nome:"Requisiti",id:"1"},
    {nome:"User Story",id:"2"},
    {nome:"Use Case",id:"3"},
    {nome:"Funzioni",id:"4"},
    {nome:"Features",id:"5"}
  ]
}

getIdByList(event) {
  /* this.contenitore.emit({id:event.id,nome:event.nome}); */
  this.contenitoriAperti.push({id:event.id,nome:event.nome});
}

cancellaIdDaLista(event) {
  this.idDaCancellare=event.id;
}

}
