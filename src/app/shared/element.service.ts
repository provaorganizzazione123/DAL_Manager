import { Injectable } from '@angular/core';
import { Element } from './element.model';
import {HttpClient} from '@angular/common/http';
import { Contenitore } from './contenitore.model';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  formData : Element;
  list :Element[];
  listaContenitori : Contenitore[];
  listaElementi : Element[];
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
  refreshContenitori(){
    this.http.get(this.rootURL + '/Contenitore').toPromise().then(res=> this.listaContenitori = res as Contenitore[]);
  }
  refreshWhere(id : number){
    
    this.http.get(this.rootURL + '/Elemento/' + id).toPromise().then(res=> this.listaElementi = res as Element[]);
    
    //this.listaElementiAppoggio.forEach(ele => {
      //this.listaElementi[id].push(ele);
      //console.log(ele.DescrizioneElemento)
    //});
    }

  putElemento(formData : Element){
    return this.http.put(this.rootURL + '/Elemento/' + formData.IdElemento, formData);
  }
  // superfunzione(){
  //  // for (var i = 0; i < this.listaElementiAppoggio.length; i++) 
  //  {
  //     var lenght = this.listaElementi.push(this.listaElementiAppoggio)
  //  }
  
  deleteElemento(formData:Element){
    return this.http.delete(this.rootURL + '/Elemento/' + formData);
  }

  populateDropDownList(){
    this.http.get(this.rootURL + '/Contenitore').toPromise().then(res => this.listaContenitori = res as Contenitore[] )
  }
}
