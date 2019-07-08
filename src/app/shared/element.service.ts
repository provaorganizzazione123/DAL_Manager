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
    var id = Id_Cont;
    var l = this.list.filter(e => e.Id_Contenitore == Id_Cont);
    this.listaElementi.push({id,l}); 
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