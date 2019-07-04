import { Component, OnInit, Input, Output, EventEmitter,SimpleChange
 } from '@angular/core';
 import { ElementService } from 'src/app/shared/element.service';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {
@Input () ListaContenitore;
@Input() idDelete;
@Output() container = new EventEmitter <{id: string, nome: string}> ();
listId=[]; 

  constructor(private service:ElementService) { }

  ngOnInit() {
    this.service.refreshContenitori()
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
    this.service.filtraLista(id);
    this.listId.push(id);
    this.container.emit( { id:id, nome:nome } );
  }
 }

 ngOnChanges (changes: {[idDelete: string]:SimpleChange}){
  
  this.listId.splice(this.listId.indexOf(this.idDelete), 1);
  this.idDelete=0;  
}


}
