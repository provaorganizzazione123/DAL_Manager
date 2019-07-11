import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService} from 'ngx-toastr';
import { Observable} from 'rxjs';
import { catchError} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AssociatedService {
  errore: string;
  result: any;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  readonly rootURL = "http://localhost:60537/api";

  listaIdElementi: number[] = [];

  PostAssociazione(){
    this.http.post("http://localhost:60537/api/Associazione", this.listaIdElementi).subscribe(
      data => {
        switch(data[0]) { 
          case "1": { 
            this.toastr.warning('Risposta Server', data[1].toString())
             break; 
          } 
          case "2": { 
            this.toastr.info('Risposta Server', data[1].toString())
             break; 
          } 
          case "3": { 
            this.toastr.success('Risposta Server', data[1].toString())
             break; 
          }
                        }
               },
      err =>{
        this.toastr.error('Attenzione', err.error.ExceptionMessage);
      }
                                                                                              )
                    }
}
