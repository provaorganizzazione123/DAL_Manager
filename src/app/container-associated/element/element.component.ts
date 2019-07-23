
import { Component, OnInit,Input, EventEmitter, Output, } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { EliminazioneComponent } from './eliminazione/eliminazione.component';
import { ModificaComponent } from './modifica/modifica.component';
import { Element } from 'src/app/shared/element.model';
import { ElementService } from 'src/app/shared/element.service';
import { AssociatedService } from '../associated.service';
import { __await } from 'tslib';
import { DettaglioComponent } from './dettaglio/dettaglio.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})

export class ElementComponent implements OnInit {

@Input() idContenitoreAperto;
@Input() listaElementi;
colore:boolean;
elemento:Element[];
drop(event: CdkDragDrop<string[]>) {

  moveItemInArray(this.elemento, event.previousIndex, event.currentIndex);
}
@Output() IdElemento = new EventEmitter();


@Input() edit : Boolean ; 

  constructor( private service : ElementService,
               private assService: AssociatedService,
               public dialog : MatDialog) { }

  ngOnInit() {

    this.listaElementi.forEach(element => {
      if (element.id == this.idContenitoreAperto){
           this.elemento=element.l;
      } 
     });
     
     this.assService.riceveSignal.subscribe((param: number) => {
      this.catchSignalComponent(param)
      });

      this.service.SegnaleAggiornamento.subscribe(()=>{
        this.service.listaElementi.forEach(element => {
          if (element.id == this.idContenitoreAperto){
               this.elemento=element.l;
          } 
         });
      })

    }

    ngAfterViewInit(): void {
      this.assService.EmitSignalComponent(1);   //Emissione del segnale per l'aggiornamento della messa in evidenza degli
      this.assService.EmitSignalComponent(7);   //elementi associati
    }

    

    catturaId(IdElemento:number){

      if(!this.edit){
        this.ModalitaEdit(IdElemento)      
      }
      else{
        this.ModalitaVisione(IdElemento)
      } 
       
      }

//MODALITA EDIT: Modalità in cui l'utento puo creare nuove associazioni o eliminare quelle già esistenti
      ModalitaEdit(IdElemento: number){

        // premendo il tasto "edit" abilito la modalità edit, e giocando con una booleana, abilito l'evento click del tasto Crea Associazione
      // metodo che cattura l'id dell'elemento che deve essere aggiunto alla lista per l'associazione
      // presente nel metodo del container-associated.

      //this.IdElemento.emit(IdElemento); // passo l'id al container-associated (padre)
      
      this.aggiungiIdElementoAListaAdatta(IdElemento);

      // ora richiamo la lista di id dall'associated.service e ne controllo la posizione dell'id attuale   
      // come prima cosa controllo che la lista non sia vuota, quindi diversa da 0   
      if(this.assService.listaIdElementi.length != 0 ){
      
      let indice = this.assService.listaIdElementi.indexOf(IdElemento);
      
      // Controllo l'indice nella lista elementi e in base alla posizione:
      // = 0  Padre
      // = -1 Elemento già associato
      // = altro  Elemento da associare
      

      if (indice === 0)
      { // entra in questo if se l'id è padre   
        this.assService.listaAppoggioIdSelezionati.push(IdElemento);

        this.selezioneElementoPadre(IdElemento);                
      }

      else if(indice === -1)
      { // entra in questo se è un elemento già associato

        if(this.assService.listaDistruggiAssociazione.length == 0)
        { // controlla se la lista da passare a db per la disassociazione ha nella posizion 0 il padre
          this.assService.listaDistruggiAssociazione[0] = this.assService.IdPadreSelezionato
        }
  
        if(!this.assService.listaDistruggiAssociazione.includes(IdElemento)){
          this.assService.listaDistruggiAssociazione.push(IdElemento);
          this.catchSignalComponent(4);
          
        }
        else{
         this.assService.listaDistruggiAssociazione.splice(this.assService.listaDistruggiAssociazione.indexOf(IdElemento),1)
         this.assService.idGiallo = IdElemento;
         
         this.catchSignalComponent(5);     
        }

      }
      else{
          // entra in questo else se l'id non è il primo della lista e quindi non è "padre"
          if(this.assService.listaAppoggioIdSelezionati.includes(IdElemento)){ // controllo se lid è presente nella lista di id selezionati
            let IdElementoinStringa:string ;                        // se è presente, lo deselezionop e lo cancello dalla lista  
          IdElementoinStringa=IdElemento.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
        let elemento = document.getElementById(IdElementoinStringa);
        elemento.style.borderWidth = "6px";
        elemento.style.borderCollapse = "separate";
        elemento.style.borderLeftStyle= "Solid";
        elemento.style.borderTopColor= "white";
        elemento.style.borderBottomColor= "white";
        elemento.style.borderColor=""; 
        this.assService.listaIdElementi.splice(this.assService.listaIdElementi.indexOf(IdElemento),1);
        this.assService.listaAppoggioIdSelezionati.splice(this.assService.listaAppoggioIdSelezionati.indexOf(IdElemento), 1);
          }
          else { // se l'id non è presente nella lista id selezionati, lo seleziono e lo aggiungo alla lista
          this.assService.listaAppoggioIdSelezionati.push(IdElemento) 
          let IdElementoinStringa:string ;
          IdElementoinStringa=IdElemento.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
        let elemento = document.getElementById(IdElementoinStringa);
        elemento.style.borderWidth = "6px";
        elemento.style.borderCollapse = "separate";
        elemento.style.borderLeftStyle= "Solid";
        elemento.style.borderTopColor= "white";
        elemento.style.borderBottomColor= "white";
        elemento.style.borderColor="green"; 
          }
        }
      }
      else{
        // entra in questo else quando la lista è uguale a 0, cioè vuota.
        // NB: la lista si svuota se premo di nuovo sull'elemento che avevo scelto come padre. 
        // si dovrebbe cancellare tutto lo style del padre e degli eventuali figli scelti, ma non
        // ancora associati a db 
        this.assService.listaAppoggioIdSelezionati.forEach(element => {
          // ciclo la lista id selezionati, per prendere ogni elemento e deselezionarlo
          let IdElementoinStringa:string ;
          IdElementoinStringa = element.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
          let elemento = document.getElementById(IdElementoinStringa);
          elemento.style.borderWidth = "5px";
          elemento.style.borderCollapse = "separate";
          elemento.style.borderColor=""; 
          elemento.style.boxShadow= "0 5px 5px -3px rgba(179, 183, 238, 0.0), 0 4px 5px 0px rgba(179, 183, 238, 0), 0 2px 7px 0px rgba(179, 183, 238, 0.842)";

        });
        // Ripeto per la lista degli elementi già associati
        this.assService.listaFiltroAssociazioni.forEach(element => {
          // ciclo la lista id selezionati, per prendere ogni elemento e deselezionarlo
          let IdElementoinStringa:string ;
          IdElementoinStringa = element.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
          let elemento = document.getElementById(IdElementoinStringa);
          elemento.style.borderWidth = "5px";
          elemento.style.borderCollapse = "separate";
          elemento.style.borderColor=""; 
          elemento.style.boxShadow= "0 5px 5px -3px rgba(179, 183, 238, 0.0), 0 4px 5px 0px rgba(179, 183, 238, 0), 0 2px 7px 0px rgba(179, 183, 238, 0.842)";
  
        });
          
        

            // poi azzero la lista
            this.assService.listaAppoggioIdSelezionati = [];
            this.assService.listaFiltroAssociazioni = [];
            this.assService.listaDistruggiAssociazione = [];
        }

      }


 // MODALITA' VISIONE: Modalita in cui l'utente può visualizzare gli elementi associati ad un altro elemento selezionato
      ModalitaVisione(IdElemento: number){

        if(this.assService.IdPadreSelezionato != 0){

          let IdElementoinStringa:string ;
          IdElementoinStringa = this.assService.IdPadreSelezionato.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
          let elemento = document.getElementById(IdElementoinStringa);
          elemento.style.borderWidth = "6px";
          elemento.style.borderCollapse = "separate";
          elemento.style.borderColor="";
          elemento.style.boxShadow= "0 5px 5px -3px rgba(179, 183, 238, 0.0), 0 4px 5px 0px rgba(179, 183, 238, 0), 0 2px 7px 0px rgba(179, 183, 238, 0.842)";
              
          this.assService.listaFiltroAssociazioni.forEach(element => {
            // ciclo la lista id selezionati, per prendere ogni elemento e deselezionarlo
            try{
            let IdElementoinStringa:string ;
            IdElementoinStringa = element.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
            let elemento = document.getElementById(IdElementoinStringa);
            elemento.style.borderWidth = "6px";
            elemento.style.borderCollapse = "separate";
            elemento.style.borderColor="";
            elemento.style.boxShadow= "0 5px 5px -3px rgba(179, 183, 238, 0.0), 0 4px 5px 0px rgba(179, 183, 238, 0), 0 2px 7px 0px rgba(179, 183, 238, 0.842)";
            }
            catch {}       
          });
        
        this.assService.listaFiltroAssociazioni = [];
        this.assService.listaIdElementi = []; 

         }
         this.assService.listaAppoggioIdSelezionati.push(IdElemento);
         this.assService.listaIdElementi.push(IdElemento);
        this.selezioneElementoPadre(IdElemento) 
      }

      selezioneElementoPadre(IdElem: number){
        this.assService.IdPadreSelezionato = IdElem;
        let IdElementoinStringa: string = IdElem.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
        let elemento = document.getElementById(IdElementoinStringa);
        elemento.style.borderLeftColor= "red";
        elemento.style.borderLeftStyle= "Solid";
        elemento.style.borderLeftWidth= "6px";
        elemento.style.borderTopColor= "white";
        elemento.style.borderBottomColor= "white";
        elemento.style.boxShadow="0 5px 5px -3px rgba(242, 2, 2, 0.0), 0 4px 5px 0px rgba(242, 2, 2, 0.0), 0 2px 7px 0px rgba(242, 2, 2, 0.842)";
  
        this.caricaListaFiltro(IdElem)
      }
  
      async caricaListaFiltro(IdPadre: number){

        await this.assService.GetAssociazioneById(IdPadre);
  
        this.catchSignalComponent(1);       //Emissione del segnale per l'aggiornamento della messa in evidenza degli
                                          //elementi associati
      }
  
      catchSignalComponent(param: number){

        /* Metodo che intercetta il segnale del service ed esegue istruzioni specifiche a seconda del valore 
           numerico ricevuto. Ad ogni numero equivale una funzionalità specifica del component  */

        switch (param) {
          case 1: // Intercettazione del segnale per la messa in evidenza degli elementi associati ad un elemento padre
                  this.assService.listaFiltroAssociazioni.forEach(ind => {
                    try{
                      if(!this.assService.listaDistruggiAssociazione.includes(ind)){
                        let elemento = document.getElementById(ind.toString());
                        elemento.style.borderLeftColor= "yellow";
                        elemento.style.borderLeftStyle= "Solid";
                        elemento.style.borderLeftWidth= "6px";
                        elemento.style.borderTopColor= "white";
                        elemento.style.borderBottomColor= "white";
                        elemento.style.boxShadow="0 5px 5px -3px rgba(242, 242, 2, 0.0), 0 4px 5px 0px rgba(242, 242, 2, 0.0), 0 2px 7px 0px rgba(242, 242, 2, 0.842)"; 
                      }
                    }
                    catch(err){
                    }
                  });
            break;
          
          case 2: //Intercettazione del segnale per la deselezione degli elementi temporaneamente selezionati in verde 
                  
                  for (let i = 1; i < this.assService.listaIdElementi.length; i++) {
                    var element = this.assService.listaIdElementi[i];
                    try{
                      let IdElementoinStringa:string ;
                      IdElementoinStringa = element.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
                      let elemento = document.getElementById(IdElementoinStringa);
                      elemento.style.borderWidth = "6px";
                      elemento.style.borderCollapse = "separate";
                      elemento.style.borderColor="";
                      elemento.style.boxShadow= "0 5px 5px -3px rgba(179, 183, 238, 0.0), 0 4px 5px 0px rgba(179, 183, 238, 0), 0 2px 7px 0px rgba(179, 183, 238, 0.842)";
                      this.assService.listaIdElementi.splice(i,1)
                    }
                    catch {}       
                    }

                    for (let i = 1; i < this.assService.listaDistruggiAssociazione.length; i++) {
                      var element = this.assService.listaDistruggiAssociazione[i];
                      try{
                        let IdElementoinStringa:string ;
                        IdElementoinStringa = element.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
                        let elemento = document.getElementById(IdElementoinStringa);
                        elemento.style.borderWidth = "6px";
                        elemento.style.borderCollapse = "separate";
                        elemento.style.borderColor="yellow";
                        elemento.style.borderTopColor= "white";
                        elemento.style.borderBottomColor= "white";
                        elemento.style.boxShadow="0 5px 5px -3px rgba(242, 242, 2, 0.0), 0 4px 5px 0px rgba(242, 242, 2, 0.0), 0 2px 7px 0px rgba(242, 242, 2, 0.842)"; 
                      }
                      catch {}       
                      }

                  this.assService.listaDistruggiAssociazione.splice(1,this.assService.listaDistruggiAssociazione.length)
                  this.assService.listaAppoggioIdSelezionati = [];
                  console.log("VERIFICA")
                  console.log(this.assService.listaIdElementi) 
                  console.log(this.assService.IdPadreSelezionato)
                  console.log(this.assService.listaDistruggiAssociazione)
            break;

          case 3:
                  this.assService.GetAssociazione();
                  for (let i = 1; i < this.assService.listaIdElementi.length; i++) {
                    this.assService.listaIdElementi.splice(i,1);
                  }
                  for (let i = 1; i < this.assService.listaAppoggioIdSelezionati.length; i++) {
                    this.assService.listaAppoggioIdSelezionati.splice(i,1);
                  }
                  this.caricaListaFiltro(this.assService.IdPadreSelezionato);
                  //this.catchSignalComponent(1);

          break;
            
          case 4:
                  let IdElementoinStringa = this.assService.listaDistruggiAssociazione[this.assService.listaDistruggiAssociazione.length-1].toString();
                  let elemento = document.getElementById(IdElementoinStringa);
                  elemento.style.borderWidth = "6px";
                  elemento.style.borderCollapse = "separate";
                  elemento.style.borderColor="black";
                  elemento.style.borderTopColor= "white";
                  elemento.style.borderBottomColor= "white";
                  elemento.style.boxShadow="0 5px 5px -3px rgba( 5, 5, 5, 0.0), 0 4px 5px 0px rgba( 5, 5, 5, 0.0), 0 2px 7px 0px rgba( 5, 5, 5, 0.842)"; 

            break;

            case 5:
                  let elementoGiallo = document.getElementById(this.assService.idGiallo.toString());
                  elementoGiallo.style.borderLeftColor= "yellow";
                  elementoGiallo.style.borderLeftStyle= "Solid";
                  elementoGiallo.style.borderLeftWidth= "6px";
                  elementoGiallo.style.borderTopColor= "white";
                  elementoGiallo.style.borderBottomColor= "white";
                  elementoGiallo.style.boxShadow="0 5px 5px -3px rgba(242, 242, 2, 0.0), 0 4px 5px 0px rgba(242, 242, 2, 0.0), 0 2px 7px 0px rgba(242, 242, 2, 0.842)"; 
          
            break;

            case 6:
                for (let i = 1; i < this.assService.listaDistruggiAssociazione.length; i++) {
                  var element = this.assService.listaDistruggiAssociazione[i];
                    let IdElementoinStringa:string ;
                    IdElementoinStringa = element.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
                    let elemento = document.getElementById(IdElementoinStringa);
                    elemento.style.borderWidth = "6px";
                    elemento.style.borderCollapse = "separate";
                    elemento.style.borderColor="";
                    elemento.style.boxShadow= "0 5px 5px -3px rgba(179, 183, 238, 0.0), 0 4px 5px 0px rgba(179, 183, 238, 0), 0 2px 7px 0px rgba(179, 183, 238, 0.842)";
                  }
                  this.assService.GetAssociazione();
                  this.assService.GetAssociazioneById(this.assService.IdPadreSelezionato);
                  this.assService.listaDistruggiAssociazione = [];
                  this.assService.listaIdAssociazioniDaEliminare = [];
                  console.log(this.assService.listaFiltroAssociazioni);
                  console.log(this.assService.listaAssociazioni);
    
            break;

            case 7: // Intercettazione segnale nella riapertura di un contenitore che ha all'interno l'elemento padre
                  debugger
                  this.assService.listaAppoggioIdSelezionati.forEach(ele => {

                    if(this.assService.listaAppoggioIdSelezionati.indexOf(ele) == 0){

                      let elemento = document.getElementById(ele);
                      elemento.style.borderLeftColor= "red";
                      elemento.style.borderLeftStyle= "Solid";
                      elemento.style.borderLeftWidth= "6px";
                      elemento.style.borderTopColor= "white";
                      elemento.style.borderBottomColor= "white";
                      elemento.style.boxShadow="0 5px 5px -3px rgba(242, 2, 2, 0.0), 0 4px 5px 0px rgba(242, 2, 2, 0.0), 0 2px 7px 0px rgba(242, 2, 2, 0.842)";
                    }
                    else{

                      let elemento = document.getElementById(ele);
                      elemento.style.borderWidth = "6px";
                      elemento.style.borderCollapse = "separate";
                      elemento.style.borderLeftStyle= "Solid";
                      elemento.style.borderTopColor= "white";
                      elemento.style.borderBottomColor= "white";
                      elemento.style.borderColor="green";
                    }
                    
                  });

            break;

            default:
            break;
        }
  
        
  
      }

      colorescritta(idColore, idIcon){
        let colore = document.getElementById(idColore);
        colore.style.color="blue";
        let icona = document.getElementById(idIcon);
        icona.style.display="block";
      }

      coloreOriginale(idColore, idIcon){
        let colore = document.getElementById(idColore);
        colore.style.color="blue";
        let icona = document.getElementById(idIcon);
        icona.style.display="none";
      }

    
      aggiungiIdElementoAListaAdatta(id){
        // metodo che riceve l'id dell'elemento da associare dal componente "element" e lo aggiunge 
        // ad una lista di id da associare
  
        // Controllo se è stato selezionato un elemento già associato al padre
        if(this.assService.listaFiltroAssociazioni.includes(id)){
          //this.caricaListaDistruggiAssociazione(id)
        }
  
        else if (this.assService.listaIdElementi.includes(id)){
          // con questa if controllo se l'id è gia inserito nella lista.
          // siccome l'id già esiste, l'aver cliccato 2 volte sullo stesso elemento,
          // ne comporta la cancellazione dalla lista.
          let indice = this.assService.listaIdElementi.indexOf(id)
          if (indice == 0){
            // Questo if serve a vedere se l'indice dell'id in questione è uguale a 0.
            // Se è uguale a 0 vuol dire che è il primo, e quindi quello che deve essere preso 
            // in considerazione come id del padre. In questo caso quindi, se si clicca di nuovo sull'elemento 
            // padre, non bisogna solo cancellare l'id dalla lista, ma azzerare l'associazione, e quindi 
            // la lista di id.
            this.assService.listaIdElementi = [];
          }
          else{
            // quindi se l'indice dell'id è diverso da zero, l'id deve essere eliminato dalla lista
          //this.assService.listaIdElementi.splice(this.assService.listaIdElementi.indexOf(id),1);
          console.log(this.assService.listaIdElementi)
          }
        }
        else {
          // se l'id non è presente nella lista, posso procedere con il push dell'id
        this.assService.listaIdElementi.push(id);
        }
        
      }


    
    /* Metodo DeleteElemento ----> """"" scaturito dal click sui bottoni X degli elementi """"
    Questo metodo crea una Dialog facendo partire il component Figlio --> EliminazioneComponent
    passando l'id dell'elemento da cancellare tramite dialogConfig.data e passando 
    l'intero oggetto dialogConfig per fargli vedere la proprietà */
    DeleteElemento(idEle:number){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.data = idEle;
      this.dialog.open(EliminazioneComponent,  dialogConfig ); 
    }

    
    /*Funzione modifica elemento, generiamo un popup(dialogConfig), generando un nuovo component */

    ModificaElemento(ele:Element){
      const dialogConfig =new MatDialogConfig();
      dialogConfig.disableClose= false;
      dialogConfig.autoFocus=true;
      dialogConfig.width="60%";
      dialogConfig.data= ele;
      this.dialog.open(ModificaComponent, dialogConfig);

    }

    dettaglioElemento(Descrizione){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.data=Descrizione;  
      this.dialog.open(DettaglioComponent, dialogConfig);
    }
}
