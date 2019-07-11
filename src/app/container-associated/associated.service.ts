import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Associated } from './associated.model';

@Injectable({
  providedIn: 'root'
})
export class AssociatedService {
  listaAppoggioIdSelezionati = [];

  readonly rootURL = "http://localhost:60537/api";

  listaAssociazioni: Associated[] = [];
  listaFiltroAssociazioni: number[] = [];

  listaIdElementi: number[] = [];

  riceveSignal: EventEmitter<boolean>;

  constructor(private http: HttpClient) { 

    this.riceveSignal = new EventEmitter<boolean>();

  }


  PostAssociazione(){

    // Metodo che richiama l'API per l'inserimento a DB di una nuova associazione

    return this.http.post(this.rootURL + "/Associazione", this.listaIdElementi);
  }

  GetAssociazione(){

    // Metodo che richiama l'API per il GET di tutte le associazioni presenti nel DB e le salva nella listaAssociazioni

    this.http.get(this.rootURL + '/Associazione').toPromise().then(res => this.listaAssociazioni = res as Associated[]);    
  }

  async GetAssociazioneById(IdPadre: number){

    // Metodo che richiama l'API per il GET filtrato di tutti gli gli ID degli elementi associati all'elemento padre

   await this.http.get(this.rootURL + '/Associazione/' + IdPadre.toString()).toPromise().then(res => this.listaFiltroAssociazioni = res as number[]);    
  }

  EvidenziaElementiAperti(signal: boolean){

    this.riceveSignal.emit(signal);

  }

  

}
