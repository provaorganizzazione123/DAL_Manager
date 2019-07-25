import { Injectable, EventEmitter } from '@angular/core';
import { Associated } from './associated.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AssociatedService {

  readonly rootURL = "http://localhost:60537/api";  // Stringa di connessione all'API utilizzata 

  IdPadreSelezionato: string = "";   // Propietà che contiene l'id del padre attualmente selezionato

  listaAssociazioni: Associated[] = [];  // Lista che contiene tutte le associazioni presenti nel DB
  
  listaFiltroAssociazioni: string[] = [];   // Lista che contiene l'id degli elementi già associati al padre selezionato (Gialli)
  
  listaDistruggiAssociazione: string[] = [];    // Lista che contiene gli id degli elementi che si vuole disassociare dall'elemento padre (Neri)
  
  listaIdAssociazioniDaEliminare: number[] = []; // Lista che contiene gli id delle associazioni che si vogliono eliminare, viene costruita partendo dalla lista listaDistruggiAssociazione
  
  listaAppoggioIdSelezionati = [];   // Lista di appoggio per gli elementi selezionati per una nuova associazione (Verdi)

  listaIdElementi: string[] = [];   // Lista degli elementi da associare ad un altro elemento identificato come padre, viene inviata al server per l'inserimento dell'associazione    

  idGiallo: string;  // Propietà di appoggio per gli Id degli elementi che devono essere evidenziati in giallo


  riceveSignal: EventEmitter<number>;  // Segnale che viene inviato all' element.component che varia a seconda della routine da eseguire

  constructor(private http: HttpClient, private toastr: ToastrService) { 
  this.riceveSignal = new EventEmitter<number>();
  }


  PostAssociazione(){

    // Metodo che richiama l'API per l'inserimento delle nuove associazioni tramite una lista che conterrà 
    // nella posizione 0 l'id del padre e in seguito gli id dei figli,
    // attende la risposta del server ed invia un messagio informativo all'utente 
    // in caso di successo emette il segnale 3 all'element.component per eseguire la routine di aggiornamento liste

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

      // Metodo che richiama l'API per l'eliminazione di una o più associazioni tramite un ciclo dell lista listaDistruggiAssociazione,
      // attende la risposta del server ed invia all'utente un messaggio di info 
      // in caso di successo invia il segnale 6 all'element.component per l'aggiornamento delle liste delle associazioni

      for (let i = 1; i < this.listaDistruggiAssociazione.length; i++) {
                        
        this.listaAssociazioni.forEach(ass => {
                          
          if(ass.Id_Elemento1 == this.listaDistruggiAssociazione[0] && ass.Id_elemento2 == this.listaDistruggiAssociazione[i]){
                  
            this.listaIdAssociazioniDaEliminare.push(ass.Id_Associazione);
                    
          }
        });   
      }

      this.listaIdAssociazioniDaEliminare.forEach(ass => {

        return this.http.delete(this.rootURL + '/Associazione/' + ass).subscribe(
          async data => {
            switch(data[0]) { 
              case "1": {
                this.toastr.warning('Risposta Server', data[1].toString());
                break; 
              } 
              case "2": { 
                this.toastr.show('Risposta Server', data[1].toString());
                break; 
              }
            }
          },
          err =>{
            this.toastr.info('Disassociazioni:', err.error.ExceptionMessage);
          });
      });

      this.EmitSignalComponent(6);
                    
    }

    
    GetAssociazione(){

      // Metodo che richiama l'API per il GET di tutte le associazioni presenti nel DB e le salva nella listaAssociazioni
                  
      this.http.get(this.rootURL + '/Associazione').toPromise().then(res => this.listaAssociazioni = res as Associated[]);    
      }
                  
      async GetAssociazioneById(IdPadre: string){
                  
      // Metodo che richiama l'API per il GET filtrato di tutti gli gli ID degli elementi associati all'elemento padre
                  
        await this.http.get(this.rootURL + '/Associazione/' + IdPadre.toString()).toPromise().then(res => this.listaFiltroAssociazioni = res as string[]);    
      }
                  

      EmitSignalComponent(signal: number){

        // Metodo che emette il segnale numerico all'element.component per l'esecuzione di una determinata routine
   
        this.riceveSignal.emit(signal);
                  
      }

}
