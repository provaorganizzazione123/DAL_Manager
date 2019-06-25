import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {
@Input () ListaContenitore;
@Output() container = new EventEmitter <{id: string, nome: string}> (); 

  constructor() { }

  ngOnInit() {
  }
 espandiContenitore (id,nome) {
  this.container.emit( { id:id, nome:nome } );
 }
}
