import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ContainerofList';
  listaContenitori = [];
  id:string;
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
  this.id = event;
}
}
