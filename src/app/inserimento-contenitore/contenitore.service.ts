import { Injectable,EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Contenitore } from '../shared/contenitore.model';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ContenitoreService {

  /*--------Dichiarazioni Variabili --------------*/

  formData: Contenitore;
  listaContenitori: Contenitore[];
  segnaleAggiornamento: EventEmitter<boolean>;
  readonly rootURL = "http://localhost:60537/api";
  // Url API

/*-----------------------------------------------*/

  constructor(private http:HttpClient,
              
              private toastr: ToastrService) { 
              this.segnaleAggiornamento = new EventEmitter<boolean>(false);
              }

 refreshContenitori(){

  var toastrErr = this.toastr;
  
  this.http.get(this.rootURL + '/Contenitore').subscribe(
                                                res=> this.listaContenitori = res as Contenitore[],
                                                error => {toastrErr.warning("Errore di connessione GET CONTENITORI reload tra 5 sec","Server Down",
                                                                             {disableTimeOut:true,
                                                                              positionClass:"toast-top-left"});
                                                          window.setTimeout(function(){location.reload()},5000)}
                                                );
  }

  postContenitore(formData : Contenitore) {
    return this.http.post(this.rootURL + '/Contenitore', formData);
  }

Aggiornamento(param:boolean) {
  this.segnaleAggiornamento.emit(param)
}

}
