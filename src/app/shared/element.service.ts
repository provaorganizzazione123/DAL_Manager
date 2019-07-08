import { Injectable } from '@angular/core';
import { Element } from './element.model';
import {HttpClient} from '@angular/common/http';
import { Contenitore } from './contenitore.model';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  formData : Element;
  list :Element[];
  listaContenitori : Contenitore[];
  listaElementi = [];
  listaElementiAppoggio: Element[];

  constructor(private http:HttpClient) { }
  readonly rootURL = "http://localhost:60537/api";
  //nome metodo uguale a controller post
  postElemento(formData : Element){
    return this.http.post(this.rootURL + '/Elemento', formData);
  }
  
  refreshList(){
    this.http.get(this.rootURL + '/Elemento').toPromise().then(res=> this.list =res as Element[]);
  }

  filtraLista(Id_Cont){

    // Metodo che filtra la lista degli elementi in una sotto-lista che contiene la lista degli
    // elementi e l'id del suo contenitore di appartenenza, questa lista verrà usata nele caricamento
    // a video del contenitore 

    var id = Id_Cont;
    if (this.controlist(id)){
    var l = this.list.filter(e => e.Id_Contenitore == Id_Cont);
    this.listaElementi.push({id,l});
    }
 }

  controlist(id){

    // Metodo che controllo se nella lista filtrata è già presente una sottolista di quel contenitore

    var cont = true;
    this.listaElementi.forEach(ele => {
      if (ele.id == id){
        cont = false
      }
    });
    return cont;
  }

  refreshContenitori(){
    this.http.get(this.rootURL + '/Contenitore').toPromise().then(res=> this.listaContenitori = res as Contenitore[]);
  }

  putElemento(formData : Element){
    return this.http.put(this.rootURL + '/Elemento/' + formData.IdElemento, formData);
  }
 
  deleteElemento(formData:Element){
    return this.http.delete(this.rootURL + '/Elemento/' + formData);
  }

  populateDropDownList(){
    this.http.get(this.rootURL + '/Contenitore').toPromise().then(res => this.listaContenitori = res as Contenitore[] )
  }
}