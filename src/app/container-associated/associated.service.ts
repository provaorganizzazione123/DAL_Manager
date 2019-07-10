import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssociatedService {

  constructor(private http: HttpClient) { }

  readonly rootURL = "http://localhost:60537/api";

  listaIdElementi: number[] = [];

  PostAssociazione(){
    return this.http.post("http://localhost:60537/api/Associazione", this.listaIdElementi);
  }
}
