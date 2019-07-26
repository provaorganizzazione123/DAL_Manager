import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltriService {
  /*--------Dichiarazioni Variabili --------------*/

  ordinamentoAssociati: EventEmitter <string>;
  ordinamentoNonAssociati: EventEmitter<string>;
  ordinamentoAlfabetico: EventEmitter<string>;

/*----------------------------------------------*/

  constructor() {
    this.ordinamentoAssociati = new EventEmitter<string>();
    this.ordinamentoNonAssociati = new EventEmitter<string>();
    this.ordinamentoAlfabetico = new EventEmitter<string>();
  }

  signalOrdinamentoAssociati(id: string) {
    // metodo richiamato da "ordinAssociati" in "menu-filtri-contenitore", che gli passa un id
    // fa un emit, dando come parametro l'id ricevuto 

    this.ordinamentoAssociati.emit(id);
  }

  signalOrdinamentoNonAssociati(id: string) {
    // metodo richiamato da "ordinNonAssociati" in "menu-filtri-contenitore", che gli passa un id
    // fa un emit, dando come parametro l'id ricevuto

    this.ordinamentoNonAssociati.emit(id);
  }

  signalOrdinamentoAlfabetico(id:string){
    // metodo richiamato da "ordinAlfabetico" in "menu-filtri-contenitore", che gli passa un id
    // fa un emit dando come parametro l'id ricevuto
    this.ordinamentoAlfabetico.emit(id);
  }

}

