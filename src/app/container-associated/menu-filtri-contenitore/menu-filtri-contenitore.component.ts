import { Component, OnInit, Input } from '@angular/core';
import {FiltriService} from './filtri.service';

@Component({
  selector: 'app-menu-filtri-contenitore',
  templateUrl: './menu-filtri-contenitore.component.html',
  styleUrls: ['./menu-filtri-contenitore.component.css']
})
export class MenuFiltriContenitoreComponent implements OnInit {

@Input() idContenitoreDiAppartenenza;

  constructor(
    private filtriService:FiltriService
  ) { }

  ngOnInit() {
  }


  ordinAssociati(){
    // attivato dal click, richiamo il metodo "signalOrdinamento" del service "filtriService"
    // passandogli l'id del contenitore di appartenenza, che a sua volta viene
    // preso in input da "container-associated" nell'html
 
    this.filtriService.signalOrdinamento(this.idContenitoreDiAppartenenza)
  }
}
