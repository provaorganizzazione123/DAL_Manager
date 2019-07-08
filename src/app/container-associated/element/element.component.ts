import { Component, OnInit,Input, } from '@angular/core';
import { Element } from 'src/app/shared/element.model';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

@Input() idContenitoreAperto;
@Input() listaElementi;
elemento:Element;
  constructor() { }

  ngOnInit() {
  
    this.listaElementi.forEach(element => {
      if (element.id == this.idContenitoreAperto){
           this.elemento=element.l;
           console.log (this.elemento.NomeElemento)
      } 
     });
    }
}
