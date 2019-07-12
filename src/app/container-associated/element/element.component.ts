
import { Component, OnInit,Input, EventEmitter, Output, } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { EliminazioneComponent } from './eliminazione/eliminazione.component';
import { ModificaComponent } from './modifica/modifica.component';
import { Element } from 'src/app/shared/element.model';
import { ElementService } from 'src/app/shared/element.service';
import { AssociatedService } from '../associated.service';
import { __await } from 'tslib';
import { DettaglioComponent } from './dettaglio/dettaglio.component'


@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})

export class ElementComponent implements OnInit {

@Input() idContenitoreAperto;
@Input() listaElementi;
colore:boolean;
@Output() IdElemento = new EventEmitter();

elemento:Element;
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
     
     this.assService.riceveSignal.subscribe((param: boolean) => {
      this.evidenziaAssociati()
      });

    }

    ngAfterViewInit(): void {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      this.assService.EvidenziaElementiAperti(true);
    }


    catturaId(IdElemento:number){

      if(!this.edit){// premendo il tasto "edit" abilito la modalità edit, e giocando con una booleana, abilito l'evento click del tasto Crea Associazione
      // metodo che cattura l'id dell'elemento che deve essere aggiunto alla lista per l'associazione
      // presente nel metodo del container-associated.

      this.IdElemento.emit(IdElemento); // passo l'id al container-associated (padre)

      // ora richiamo la lista di id dall'associated.service e ne controllo la posizione dell'id attuale   
      // come prima cosa controllo che la lista non sia vuota, quindi diversa da 0   
      if(this.assService.listaIdElementi.length != 0 ){
      
      let indice = this.assService.listaIdElementi.indexOf(IdElemento);
      
      // in base alla posizione nell'indice dell'id: se l'indice è 0 vuol dire che quello è l'id
      // del padre.Setto la booleana color a true
      if(indice === 0 )
      {
        this.colore = true;
      }
      else // se l'indice dell'id è diverso da 0 vuol dire che l'id selezionato non è padre e va 
      //messo in risalto con un altro colore. Setto la booleana colore a false  
      {this.colore = false;}
      

      if (this.colore)
      { // entra in questo if se l'id è padre   
        this.assService.listaAppoggioIdSelezionati.push(IdElemento)   
        let IdElementoinStringa:string ;
        IdElementoinStringa = IdElemento.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
        let elemento = document.getElementById(IdElementoinStringa);
        elemento.style.borderWidth = "5px";
        elemento.style.borderCollapse = "separate";
        elemento.style.borderColor="red"; 
                
      }
        else{
          // entra in questo else se l'id non è il primo della lista e quindi non è "padre"
          if(this.assService.listaAppoggioIdSelezionati.includes(IdElemento)){ // controllo se lid è presente nella lista di id selezionati
            let IdElementoinStringa:string ;                        // se è presente, lo deselezionop e lo cancello dalla lista  
          IdElementoinStringa=IdElemento.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
        let elemento = document.getElementById(IdElementoinStringa);
        elemento.style.borderWidth = "1px";
        elemento.style.borderCollapse = "separate";
        elemento.style.borderColor=""; 
        this.assService.listaAppoggioIdSelezionati.splice(this.assService.listaAppoggioIdSelezionati.indexOf(this.IdElemento), 1);
          }
          else { // se l'id non è presente nella lista id selezionati, lo seleziono e lo aggiungo alla lista
          this.assService.listaAppoggioIdSelezionati.push(IdElemento) 
          let IdElementoinStringa:string ;
          IdElementoinStringa=IdElemento.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
        let elemento = document.getElementById(IdElementoinStringa);
        elemento.style.borderWidth = "5px";
        elemento.style.borderCollapse = "separate";
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
          elemento.style.borderWidth = "1px";
          elemento.style.borderCollapse = "separate";
          elemento.style.borderColor=""; 

          
        });

            // poi azzero la lista
            this.assService.listaAppoggioIdSelezionati = [];
        
        }
      }
      else {

        if(this.assService.IdPadreSelezionato == 0){}
        else{
        let IdElementoinStringa:string ;
        IdElementoinStringa = this.assService.IdPadreSelezionato.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
        let elemento = document.getElementById(IdElementoinStringa);
        elemento.style.borderWidth = "1px";
        elemento.style.borderCollapse = "separate";
        elemento.style.borderColor="";
        
        this.assService.listaFiltroAssociazioni.forEach(element => {
            // ciclo la lista id selezionati, per prendere ogni elemento e deselezionarlo
            let IdElementoinStringa:string ;
            IdElementoinStringa = element.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
            let elemento = document.getElementById(IdElementoinStringa);
            elemento.style.borderWidth = "1px";
            elemento.style.borderCollapse = "separate";
            elemento.style.borderColor="";       
          });
        
        this.assService.listaFiltroAssociazioni = [];
        }
        
        this.selezioneElementoPadre(IdElemento)
        }
      }

      selezioneElementoPadre(IdElem: number){
        this.assService.IdPadreSelezionato = IdElem;
        let IdElementoinStringa:string ;
        IdElementoinStringa = IdElem.toString(); // getElementById vuole come id una stringa, quindi devo convertire l'id in stringa
        let elemento = document.getElementById(IdElementoinStringa);
        elemento.style.borderWidth = "5px";
        elemento.style.borderCollapse = "separate";
        elemento.style.borderColor="red"; 
  
        this.caricaListaFiltro(IdElem)
      }
  
      async caricaListaFiltro(IdPadre: number){
  
        console.log("Entrato");
  
        console.log(IdPadre);
  
        await(this.assService.GetAssociazioneById(IdPadre));
  
        this.evidenziaAssociati();
  
      }
  
      evidenziaAssociati(){
  
        console.log(this.assService.listaFiltroAssociazioni);
  
        this.assService.listaFiltroAssociazioni.forEach(ele => {
          try{
          let elemento = document.getElementById(ele.toString());
          elemento.style.borderWidth = "5px";
          elemento.style.borderCollapse = "separate";
          elemento.style.borderColor="yellow";  
          }
          catch(err){
            
          }
          
        });
  
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
