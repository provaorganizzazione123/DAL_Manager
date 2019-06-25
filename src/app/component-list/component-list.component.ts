import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {
@Input () contenitore:[{nome: string, id:string}];
@Output () id_contenitore = new EventEmitter () ; 

  constructor() { }

  ngOnInit() {
  }
 espandiContenitore (id) {
  this.id_contenitore.emit(id);
 }
}
