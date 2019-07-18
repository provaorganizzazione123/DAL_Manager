import { Injectable, EventEmitter } from '@angular/core';
import { Associated } from './associated.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService} from 'ngx-toastr';
import { Observable} from 'rxjs';
import { catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AssociatedService {
  listaAppoggioIdSelezionati = [];
  IdPadreSelezionato: number = 0;

  errore: string;
  result: any;

  readonly rootURL = "http://localhost:60537/api";

  listaAssociazioni: Associated[] = [];
  listaFiltroAssociazioni: number[] = [];
  listaDistruggiAssociazione: number[] = [];

  listaIdElementi: number[] = [];
  idGiallo: number;


  riceveSignal: EventEmitter<number>;
  constructor(private http: HttpClient, private toastr: ToastrService) { 
  this.riceveSignal = new EventEmitter<number>();
  }


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
            this.toastr.success('Risposta Server', data[1].toString());
            this.EmitSignalComponent(3);
            break; 
          }
             }
               },
      err =>{
        this.toastr.error('Attenzione', err.error.ExceptionMessage);
      }
                                                                                              )
                    }

        DeleteAssociazione(){

        this.http.delete("http://localhost:60537/api/Associazione" , this.listaDistruggiAssociazione).subscribe(
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
            this.toastr.success('Risposta Server', data[1].toString());
            this.EmitSignalComponent(3);
            break; 
          }
             }
               },
      err =>{
        this.toastr.error('Attenzione', err.error.ExceptionMessage);
      }
                                                                                              )

        }

        GetAssociazione(){

          // Metodo che richiama l'API per il GET di tutte le associazioni presenti nel DB e le salva nella listaAssociazioni
                  
          this.http.get(this.rootURL + '/Associazione').toPromise().then(res => this.listaAssociazioni = res as Associated[]);    
          }
                  
          async GetAssociazioneById(IdPadre: number){
                  
          // Metodo che richiama l'API per il GET filtrato di tutti gli gli ID degli elementi associati all'elemento padre
                  
            await this.http.get(this.rootURL + '/Associazione/' + IdPadre.toString()).toPromise().then(res => this.listaFiltroAssociazioni = res as number[]);    
          }
                  

          EmitSignalComponent(signal: number){
   
            this.riceveSignal.emit(signal);
                  
          }

}
