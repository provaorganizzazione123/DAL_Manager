import { Injectable, EventEmitter } from '@angular/core';
import { Element } from './element.model';
import {HttpClient} from '@angular/common/http';
import { Contenitore } from './contenitore.model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  formData : Element;
  list :Element[];
  listaContenitori : Contenitore[];
  listaElementi = [];
  listaElementiAppoggio: Element[];
  SegnaleAggiornamento: EventEmitter<boolean>;

  constructor(private http:HttpClient,
              private toastr: ToastrService) {
                this.SegnaleAggiornamento= new EventEmitter<boolean>()
               }
              
  readonly rootURL = "http://localhost:60537/api";
  //nome metodo uguale a controller post
  postElemento(formData : Element):Observable<Element>{
    return this.http.post<Element>(this.rootURL + '/Elemento', formData);
  }
  
  async refreshList(){
   await this.http.get(this.rootURL + '/Elemento').toPromise().then(res=> this.list =res as Element[]);
  }

  filtraLista(Id_Cont){

    // Metodo che filtra la lista degli elementi in una sotto-lista che contiene la lista degli
    // elementi e l'id del suo contenitore di appartenenza, questa lista verrà usata nele caricamento
    // a video del contenitore 

    var id = Id_Cont;
   // if (this.controlist(id)){
    var l = this.list.filter(e => e.Id_Contenitore == Id_Cont);
    this.listaElementi.push({id,l});
   // }

  }

   // controlist(id){

    // Metodo che controllo se nella lista filtrata è già presente una sottolista di quel contenitore

  //   var cont = true;
  //   this.listaElementi.forEach(ele => {
  //     if (ele.id == id){
  //       cont = false
  //     }
  //   });
  //   return cont;
  // }  

  putElemento(formData : Element){
    return this.http.put(this.rootURL + '/Elemento/' + formData.IdElemento, formData);
  }
 
  deleteElemento(id:number){
    return this.http.delete(this.rootURL + '/Elemento/' + id).subscribe(
      async data => {
        switch(data[0]) { 
          case "1": { 
            this.toastr.warning('Risposta Server', data[1].toString());
            await this.refreshList();
            this.filtraLista(id);
            this.emetteSegnaleAggiornamento(true);
             break; 
          } 
          case "2": { 
            this.toastr.info('Risposta Server', data[1].toString());
            await this.refreshList();
            this.filtraLista(id);
            this.emetteSegnaleAggiornamento(true);
             break; 
          } 
          case "3": { 
            this.toastr.success('Risposta Server', data[1].toString());
            await this.refreshList();
            this.filtraLista(id);
            this.emetteSegnaleAggiornamento(true);
             break; 
          }
                        }
               },
      err =>{
        this.toastr.error('Attenzione', err.error.ExceptionMessage);
      });
  }

  populateDropDownList(){
    this.http.get(this.rootURL + '/Contenitore').toPromise().then(res => this.listaContenitori = res as Contenitore[] )
  }

  emetteSegnaleAggiornamento (parametro:boolean){
    this.SegnaleAggiornamento.emit(parametro);
  }
}