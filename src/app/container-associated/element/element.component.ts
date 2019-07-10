import { Component, OnInit,Input, Output, EventEmitter, } from '@angular/core';
import { Element } from 'src/app/shared/element.model';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

@Input() idContenitoreAperto;
@Input() listaElementi;
@Output() IdElemento = new EventEmitter();
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

    catturaId(IdElemento:number){

      // metodo che cattura l'id dell'elemento che deve essere aggiunto alla lista per l'associazione
      // presente nel metodo del container-associated.

      this.IdElemento.emit(IdElemento);
    }
}
