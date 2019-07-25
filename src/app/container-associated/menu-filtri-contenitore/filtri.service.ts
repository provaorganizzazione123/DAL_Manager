import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltriService {
  ordinamentoAssociati: EventEmitter<string>;

  constructor() { 
    this.ordinamentoAssociati= new EventEmitter<string>();
  }

  signalOrdinamento(id:string){
    // metodo richiamato da "ordinAssociati" in "menu-filtri-contenitore", che gli passa un id
    // fa un emit, dando come parametro l'id ricevuto
    debugger
    this.ordinamentoAssociati.emit(id);
  }
}

