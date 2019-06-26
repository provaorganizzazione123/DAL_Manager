import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {
@Input () ListaContenitore;
@Output() container = new EventEmitter <{id: string, nome: string}> ();
listId=[]; 

  constructor() { }

  ngOnInit() {
  }
 espandiContenitore (id,nome) {
   let bool = true;
   for (let index = 0; index < this.listId.length; index++) {
     const element = this.listId[index];
     if (element == id)
     {
        bool=false;
        break;
     }    
   }
   if (bool) {
    this.listId.push(id);
    this.container.emit( { id:id, nome:nome } );
  }
 }
}
