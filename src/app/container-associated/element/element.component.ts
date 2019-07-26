
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
import {FiltriService} from'../menu-filtri-contenitore/filtri.service';


@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})

export class ElementComponent implements OnInit {

  /* -------Dichiarazioni Variabili --------------*/

  @Input() idContenitoreAperto;   // Propietà che prende in input l'id del contenitore appena aperto
  @Input() listaElementi;   // Lista presa in input che contiene tutti gli elementi di un determinato contenitore viene ciclata nel ng-for per la creazione degli elementi a video
  @Input() edit : Boolean ;  // Propietà presa in input per eseguire routine di EDIT o VISUALIZZAZIONE
  @Output() IdElemento = new EventEmitter();    // Propietà che contiene l'id dell'elemento selezionato, emessa in out-put 
  click: boolean = true;
  colore:boolean;
  elemento:Element[];  // Oggetto di tipo Element utilizzato per il drag & drop 
  associati = []; // array di appoggio per il metodo "ordinaAssociati"

  /*------------------------------------------------*/



  constructor( private service : ElementService,
               private assService: AssociatedService,
               private filtriService :FiltriService,
               public dialog : MatDialog) { }

               ngOnInit() {
                 // Nell'init viene ciclata la lista degli elementi in base all'id del contenitore                
                 this.listaElementi.forEach(element => {
                   if (element.id == this.idContenitoreAperto){
                        this.elemento=element.l;
                        // ordino l'array elemento in ordine alfabetico in base al nome dell'elemento 
                        this.elemento.sort((a,b)=> (a.NomeElemento.toLowerCase() > b.NomeElemento.toLowerCase()) ? 1 : ((b.NomeElemento.toLowerCase() > a.NomeElemento.toLowerCase()) ? -1 : 0));
                   } 
                  });
             
                  // Questo subscribe monitora il segnale delle routine inviato da altri component e lancia il metodo che gestisce questi segnali numerici
                  
                  this.assService.riceveSignal.subscribe((param: number) => {
                   this.catchSignalComponent(param)
                   });
             
                   // Questo subscribe monitora il segnale di aggiornamento che viene inviato come true nel caso di un nuovo elemento inserito
                   // e riesegue il ciclo di filtro della lista elementi in base all'id del contenitore
                   
                   this.service.SegnaleAggiornamento.subscribe(()=>{
                     this.service.listaElementi.forEach(element => {
                       if (element.id == this.idContenitoreAperto){
                            this.elemento=element.l;
                            this.elemento.sort((a,b)=> (a.NomeElemento.toLowerCase() > b.NomeElemento.toLowerCase()) ? 1 : ((b.NomeElemento.toLowerCase() > a.NomeElemento.toLowerCase()) ? -1 : 0));
                       } 
                      });
                   })
       // controllo la variabile "ordinamentoAssociati" del service "filtri" 
       // azzero la lista associati e faccio partire il metodo "ordinaAssociati"
       // passandogli il contenuto della variabile, solo se il contenuto stesso 
        //della variabile (che è un id contenitore)
       // è uguale all'id del contenitore dove sono adesso.
      this.filtriService.ordinamentoAssociati.subscribe(num =>{
        if(num == this.idContenitoreAperto){
        this.associati= [];
        this.ordinaAssociati(num);
        }
      });

      // controllo la variabile "ordinamentoNonAssociati" del service "filtri"
      // azzerlo la lista "associati" e faccio partire il metodo "ordinaNonAssociati"
      // passandogli il contenuto della variabile, solo se il contenuto stesso della variabile
      // (che è l'id contenitore)
      // è uguale all'id del contenitore dove sono adesso

       this.filtriService.ordinamentoNonAssociati.subscribe(num =>{
         if (num == this.idContenitoreAperto){
           this.associati = [];
          this.ordinaNonAssociati(num);
        }
       });

       // controllo la variabile "ordinamentoAlfabetico" del service "filtri"
       // afaccio partire il metodo "ordinamentoAlfabetico"
       // passandogli il contenuto della variabile, solo se il contenuto della stessa variabile
       // (che è l'id contenitore)
       // è uguale all'id del contenitore dove sono adesso

       this.filtriService.ordinamentoAlfabetico.subscribe(num =>{
         if (num ==  this.idContenitoreAperto){
           this.ordinamentoAlfabetico();
         }
       });

    }

    ngAfterViewInit(): void {

      // Questi 2 segnali vengono inviati direttamente al metodo per l'aggiornamento in tempo reale di CRUD dell'elemento
      // o nel caso di aggiornamento associazione 

      this.catchSignalComponent(1);
      this.catchSignalComponent(7);
    }

    drop(event: CdkDragDrop<string[]>) {
  
      // Evento che abilita il drag & drop degli elementi
    
      moveItemInArray(this.elemento, event.previousIndex, event.currentIndex);
    }

    

    catturaId(IdElemento:string){
      // Metodo che prende l'id dell'elemento selezionato al momento del click, ed esegue il metodo giusto in base
      // alla modalita selelzionata (EDIT, VISUAL)

      if(this.click){
        if(!this.edit){
          this.ModalitaEdit(IdElemento)      
        }
        else{
          this.ModalitaVisione(IdElemento)
        } 
      }
       
      }

     //MODALITA EDIT: Modalità in cui l'utento puo creare nuove associazioni o eliminare quelle già esistenti
      ModalitaEdit(IdElemento: string){

      // premendo il tasto "edit" abilito la modalità edit, e giocando con una booleana, abilito l'evento click del tasto Crea Associazione
      // metodo che cattura l'id dell'elemento che deve essere aggiunto alla lista per l'associazione
      // presente nel metodo del container-associated.
      
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
          // Carica la lista degli id da disassociare se la lista stessa non contiene l'id selezionato 
          this.assService.listaDistruggiAssociazione.push(IdElemento);
          this.catchSignalComponent(4);   // Invio segnale per evidenziamento in Nero
          
        }
        else{
          // Toglie dalla lista degli id da disassociare nel caso in cui l'utente sceglie di non disassociare più l'elemento 
         this.assService.listaDistruggiAssociazione.splice(this.assService.listaDistruggiAssociazione.indexOf(IdElemento),1)
         this.assService.idGiallo = IdElemento;
         
         this.catchSignalComponent(5);  // Invio segnale per evidenziamento in Giallo
        }

      }
      else{
          // entra in questo else se l'id non è il primo della lista e quindi non è "padre"
          if(this.assService.listaAppoggioIdSelezionati.includes(IdElemento)){    // controllo se lid è presente nella lista di id selezionati
            let IdElementoinStringa:string ;                                      // se è presente, lo deselezionop e lo cancello dalla lista  
          IdElementoinStringa=IdElemento.toString();                              // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
        let elemento = document.getElementById(IdElementoinStringa);
        elemento.className='ElementoBianco';
        this.assService.listaIdElementi.splice(this.assService.listaIdElementi.indexOf(IdElemento),1);
        this.assService.listaAppoggioIdSelezionati.splice(this.assService.listaAppoggioIdSelezionati.indexOf(IdElemento), 1);
          }
          else { 
            // se l'id non è presente nella lista id selezionati, lo seleziono e lo aggiungo alla lista
          this.assService.listaAppoggioIdSelezionati.push(IdElemento) 
          let IdElementoinStringa:string ;
          IdElementoinStringa=IdElemento.toString();    // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
          let elemento = document.getElementById(IdElementoinStringa);
          elemento.className='ElementoVerde';
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
          elemento.className='ElementoBianco';

        });
        // Ripeto per la lista degli elementi già associati
        this.assService.listaFiltroAssociazioni.forEach(element => {
          // ciclo la lista id selezionati, per prendere ogni elemento e deselezionarlo
          let IdElementoinStringa:string ;
          IdElementoinStringa = element.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
          let elemento = document.getElementById(IdElementoinStringa);
          elemento.className='ElementoBianco';  

        });      

            // poi azzero la lista
            this.assService.listaAppoggioIdSelezionati = [];
            this.assService.listaFiltroAssociazioni = [];
            this.assService.listaDistruggiAssociazione = [];
        }

      }


        // MODALITA' VISIONE: Modalita in cui l'utente può visualizzare gli elementi associati ad un altro elemento selezionato
        ModalitaVisione(IdElemento: string){
         
        if(this.assService.IdPadreSelezionato != ""){

          // Controlla se è gia stato selelzionato un elemento come padre, toglie l'evidenziatura del padre e degli elementi associati

          let IdElementoinStringa:string ;
          IdElementoinStringa = this.assService.IdPadreSelezionato.toString();    // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
          let elemento = document.getElementById(IdElementoinStringa);
          elemento.className='ElementoBianco';

          this.assService.listaFiltroAssociazioni.forEach(element => {
            // ciclo la lista id selezionati, per prendere ogni elemento e deselezionarlo
            try{
            let IdElementoinStringa:string ;
            IdElementoinStringa = element.toString();     // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
            let elemento = document.getElementById(IdElementoinStringa);
            elemento.className='ElementoBianco';
            }
            catch {}       
          });
        
        this.assService.listaFiltroAssociazioni = [];
        this.assService.listaIdElementi = []; 
        this.assService.listaAppoggioIdSelezionati = [];

         }
         this.assService.listaAppoggioIdSelezionati.push(IdElemento);
         this.assService.listaIdElementi.push(IdElemento);
        this.selezioneElementoPadre(IdElemento) 
      }

      selezioneElementoPadre(IdElem: string){

        // Metodo richiamato quando si vuole selezionare un nuovo elemento come padre

        this.assService.IdPadreSelezionato = IdElem;
        let IdElementoinStringa: string = IdElem.toString();    // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
        let elemento = document.getElementById(IdElementoinStringa);
        elemento.className='ElementoRosso';  
        this.caricaListaFiltro(IdElem)
      }
  
      async caricaListaFiltro(IdPadre: string){

        // Metodo richiamato quando si vuole evidenziare di giallo un elemento già associato al padre selezionato

        await this.assService.GetAssociazioneById(IdPadre);
  
        // richiamo il metodo "emetteSegnaleRegisto" , passando lo 0 in modo che quando arriva lo 0 al component
        // registro fa partire il metodo per il caricamento del REgistro.
        await this.service.emetteSegnaleRegistro(0);

        this.catchSignalComponent(1);       //Emissione del segnale per l'aggiornamento della messa in evidenza degli
                                            //elementi associati
      }
  
      catchSignalComponent(param: number){

        /* Metodo che intercetta il segnale del service ed esegue istruzioni specifiche a seconda del valore 
           numerico ricevuto. Ad ogni numero equivale una routine specifica del component  */

        switch (param) {
          case 1: // Intercettazione del segnale per la messa in evidenza degli elementi già associati ad un elemento padre
                  this.assService.listaFiltroAssociazioni.forEach(ind => {
                    try{
                      if(!this.assService.listaDistruggiAssociazione.includes(ind)){
                        let elemento = document.getElementById(ind.toString());
                        elemento.className='ElementoGiallo';
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
                      elemento.className='ElementoBianco';
                    }
                    catch {}       
                    }

                    for (let i = 1; i < this.assService.listaDistruggiAssociazione.length; i++) {
                      var element = this.assService.listaDistruggiAssociazione[i];
                      try{
                        let IdElementoinStringa:string ;
                        IdElementoinStringa = element.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
                        let elemento = document.getElementById(IdElementoinStringa);
                        elemento.className='ElementoGiallo';
                      }
                      catch {}       
                      }

                  this.assService.listaDistruggiAssociazione.splice(1,this.assService.listaDistruggiAssociazione.length);
                  this.assService.listaAppoggioIdSelezionati.splice(1,this.assService.listaAppoggioIdSelezionati.length);

            break;

          case 3:
                  // Routine di aggiornamento liste nel caso di nuove associazioni 
                  
                  this.assService.GetAssociazione();
                  for (let i = 1; i < this.assService.listaIdElementi.length; i++) {
                    this.assService.listaIdElementi.splice(i,1);
                  }
                  for (let i = 1; i < this.assService.listaAppoggioIdSelezionati.length; i++) {
                    this.assService.listaAppoggioIdSelezionati.splice(i,1);
                  }
                  this.caricaListaFiltro(this.assService.IdPadreSelezionato);

          break;
            
          case 4:
                  // Routine di evidenziamento nero degli elementi che si vogliono disassociare 
                  let IdElementoinStringa = this.assService.listaDistruggiAssociazione[this.assService.listaDistruggiAssociazione.length-1].toString();
                  let elemento = document.getElementById(IdElementoinStringa);
                  elemento.className='ElementoNero';

            break;

            case 5:
                  // Routine di evidenziamento giallo di un elemento già associato
                  let elementoGiallo = document.getElementById(this.assService.idGiallo.toString());
                  elementoGiallo.className='ElementoGiallo';          
            break;

            case 6:
                    // Routine che si verifica all'avvenuta disassociazione di uno o più elementi
                    // Il ciclo si occupa di togliere il bordo giallo agli elementi non più associati
                    // poi vengono aggiornate le liste delle associazioni e si azzerano le liste di appoggio per le disassociazioni appena avvenute

                for (let i = 1; i < this.assService.listaDistruggiAssociazione.length; i++) {
                  var element = this.assService.listaDistruggiAssociazione[i];
                    let IdElementoinStringa:string ;
                    IdElementoinStringa = element.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
                    let elemento = document.getElementById(IdElementoinStringa);
                    elemento.className='ElementoBianco';
                }
                  this.assService.GetAssociazione();
                  this.assService.GetAssociazioneById(this.assService.IdPadreSelezionato);
                  this.assService.listaDistruggiAssociazione = [];
                  this.assService.listaIdAssociazioniDaEliminare = [];
    
            break;

            case 7: // Intercettazione segnale nella riapertura di un contenitore, che cicla le due liste di 
                    // appoggio degli elementi selezionati come nuova associazione (Verdi) e come elementi da 
                    // disassociare (Neri) e li evidenzia
              
                  this.assService.listaAppoggioIdSelezionati.forEach(ele => {

                    if(this.assService.listaAppoggioIdSelezionati.indexOf(ele) == 0){

                      let elemento = document.getElementById(ele);
                      elemento.className='ElementoRosso';
                      }
                    else{

                      let elemento = document.getElementById(ele);
                      elemento.className='ElementoVerde';
                    }
                    
                  });

                  for (let i = 1; i < this.assService.listaDistruggiAssociazione.length; i++) {
                    
                    let elemento = document.getElementById(this.assService.listaDistruggiAssociazione[i]);
                      elemento.className='ElementoNero';
                    
                  }

            break;

            default:
                   // DEFAULT
            break;
        }
  
        
  
      }

      colorescritta(idColore, idIcon){

        // Metodo che gestisce il colore del nome di un elemento quando si verifica un mouse-over

        let colore = document.getElementById(idColore);
        colore.style.color="blue";
        colore.style.backgroundColor= "antiquewhite";
        let icona = document.getElementById(idIcon);
        icona.style.display="block";
      }

      coloreOriginale(idColore, idIcon){

        // Metodo che gestisce il colore del nome di un elemento quando si verifica un mouse-leave

        let colore = document.getElementById(idColore);
        colore.style.color="black";
        colore.style.backgroundColor= "white";
        let icona = document.getElementById(idIcon);
        icona.style.display="none";
      }

      disabilitaElem(){ 
        this.click = false;
      }

      abilitaElem(){
        this.click= true;
      }

      coloreIconaModifica(param){
        let colore = document.getElementById(param);
        colore.style.color = "black";
      }

      coloreIconaModificaOrig(param){
        let colore = document.getElementById(param);
        colore.style.color = "gray";
      }

      coloreIconaDettaglio(param){
        let colore = document.getElementById(param);
        colore.style.color = "black";
      }

      coloreIconaDettaglioOrig(param){
        let colore = document.getElementById(param);
        colore.style.color = "gray";
      }

      coloreIconaElimina(param){
        let colore = document.getElementById(param);
        colore.style.color = "red";
      }

      coloreIconaEliminaOrig(param){
        let colore = document.getElementById(param);
        colore.style.color = "gray";
      }


    
      aggiungiIdElementoAListaAdatta(id){

        // Metodo che gestisce il la selezione di un elemento aggiungendolo tramite controlli alla 
        // lista adatta
  
        // Controllo se è stato selezionato un elemento già associato al padre
        if(this.assService.listaFiltroAssociazioni.includes(id)){
          // l'inserimento della lista avviene nel metodo modalitaEdit, modalitaVisual
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
            // richiamo il "emmetteSegnaleRegisto" passando 1 in modo che quando l'1 arriva al component Registo, 
            // viene resettato sia il padre che la lista contenente i figli. 
            this.service.emetteSegnaleRegistro(1);
          }
        }
        else {
          // se l'id non è presente nella lista, posso procedere con il push dell'id
        this.assService.listaIdElementi.push(id);
        }
        
      }


    DeleteElemento(elementoDelete:Element){

      // Metodo DeleteElemento ----> """"" scaturito dal click sui bottoni X degli elementi """"
      // Questo metodo crea una Dialog facendo partire il component Figlio --> EliminazioneComponent
      // passando l'id dell'elemento da cancellare tramite dialogConfig.data e passando 
      // l'intero oggetto dialogConfig per fargli vedere la proprietà

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.data = elementoDelete;
      this.dialog.open(EliminazioneComponent,  dialogConfig ); 
    }

    
    

    ModificaElemento(ele:Element){

      // Funzione modifica elemento, generiamo un popup(dialogConfig), generando un nuovo component

      const dialogConfig =new MatDialogConfig();
      dialogConfig.disableClose= false;
      dialogConfig.autoFocus=true;
      dialogConfig.width="60%";
      dialogConfig.data= ele;
      this.dialog.open(ModificaComponent, dialogConfig);

    }

    dettaglioElemento(Descrizione){

      // Metodo per la visualizzazione del dettaglio di un elemento generando un popup

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.data=Descrizione;  
      this.dialog.open(DettaglioComponent, dialogConfig);
    }



  ordinaAssociati(idContenitore) { 
    // metodo per riordinare gli elementi del contenitore, mettendo in alto quelli associati 
    // all'elemento selezionato.
    // prima mi filtro la lista di tutti gli elementi associati all'elemento selezionato 
    // (lista che contiene solo  gli id degli elementi), e grazie a "list", mi ricavo l'elemento completo
    // aggiungo poi l'elemento nella lista "associati".
    this.assService.listaFiltroAssociazioni.forEach(element => {
      let elemento = this.service.list.filter(e => e.IdElemento == element)[0];
      this.associati.push(elemento);
    });
    // filtro poi la lista "associati" e mi prendo solo gli elementi del contenitore in questione
    // a questo punto mi ritrovo con la lista degli elementi associati all'elemento selezionato,
    // ma che appartengono al contenitore di riferimento.
    let list = this.associati.filter(e=>e.Id_Contenitore == idContenitore)
    // metto la lista in ordine alfabetico
    // mi ciclo la lista , e per ogni suo elemento mi vado a ricavare l'indice nella lista "elemento"
    // che è la lista che uso nell' *ngFor
    // avuto l'indice, prima rimuovo l'elemento dalla lista, poi lo inserisco all'indice 0,
    // in modo che quando vado a ciclare nell'*ngFor la lista "elemento" lo troverò come primo
    // elementoe quindi a video verrà visualizzato in alto rispetto agli altri.
    // Ovviamente essendo in un ciclo, questa operazione viene fatta per tutti gli elementi
    // di "list", quindi questi elementi mi appariranno a video più in alto rispetto agli altri.
    list.sort((a,b)=> (a.NomeElemento.toLowerCase() < b.NomeElemento.toLowerCase()) ? 1 : ((b.NomeElemento.toLowerCase() < a.NomeElemento.toLowerCase()) ? -1 : 0));    
    list.forEach(element => {
      let indice = this.elemento.indexOf(element);
      this.elemento.splice(indice, 1);
      this.elemento.splice(0, 0, element);
    })
  }

  ordinaNonAssociati(idContenitore) {
    // metodo per riordinare gli elementi del contenitore, mettendo in alto quelli non associati all'elemento selezionato
    // prima mi filtro la lista di tutti gli elementi associati all'elemento selezionato
    // (lista che contiene solo gli id degli elementi), e grazie a "list", mi ricavo l'elemento completo
    // aggiungo poi l'elemento nella lista "associati" 
    
    this.assService.listaFiltroAssociazioni.forEach(element => {
      let elemento = this.service.list.filter(e => e.IdElemento == element)[0];
      this.associati.push(elemento);
    });
    // filtro la lista "associati" e mi prendo solo gli elementi del contenitore in questione
    // a questo punto mi ritrovo con la lista degli elementi associati all'elemento selezionato,
    // ma che appartengono solo al contenitore di riferimento.
    let list = this.associati.filter(e => e.Id_Contenitore == idContenitore)
    // metto la lista in ordine alfabetico, e poi la ciclo
    // per ogni passaggio del ciclo mi ricavo l'indice dell'elemeneto
    // grazie all'indice riesco a rimuoverlo dalla lista "elemento"
    // poi riaggiungo l'elemento in modo che si ritrovi in fondo alla lista
    // e di conseguenza anche a video si ritroverà in fondo.
    //Avrò cosi gli elementi non associati in alto e gli elementi associati in basso.
    list.sort((a,b)=> (a.NomeElemento.toLowerCase() > b.NomeElemento.toLowerCase()) ? 1 : ((b.NomeElemento.toLowerCase() > a.NomeElemento.toLowerCase()) ? -1 : 0));
    list.forEach(element => {
      let indice = this.elemento.indexOf(element);
      this.elemento.splice(indice, 1);
      this.elemento.push(element);

    })
  }

  ordinamentoAlfabetico(){
    // metodo per riordinare la lista degli elementi in ordine alfabetico A-Z
    this.elemento.sort((a,b)=> (a.NomeElemento.toLowerCase() > b.NomeElemento.toLowerCase()) ? 1 : ((b.NomeElemento.toLowerCase() > a.NomeElemento.toLowerCase()) ? -1 : 0));
  }

}
