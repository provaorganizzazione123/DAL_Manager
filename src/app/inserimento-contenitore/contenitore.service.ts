import { Injectable,EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Contenitore } from '../shared/contenitore.model';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ContenitoreService {
  readonly rootURL = "http://localhost:60537/api";
  // Url API 
  formData : Contenitore;
  listaContenitori : Contenitore[];
  segnaleAggiornamento : EventEmitter<boolean> ;

  constructor(private http:HttpClient,
              
              private toastr: ToastrService) { 
              this.segnaleAggiornamento = new EventEmitter<boolean>(false);
              }

 refreshContenitori(){
  this.http.get(this.rootURL + '/Contenitore').toPromise().then(res=> this.listaContenitori = res as Contenitore[]);
  }

  postContenitore(formData : Contenitore) {
    return this.http.post(this.rootURL + '/Contenitore', formData);
  }

Aggiornamento(param:boolean) {
  this.segnaleAggiornamento.emit(param)
}

}
