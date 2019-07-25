import { Component, OnInit, Input,Output,  EventEmitter } from '@angular/core';
import {ElementService} from 'src/app/shared/element.service';
import {AssociatedService} from 'src/app/container-associated/associated.service';
import {RegistroAssociazioniComponent} from '../registro-associazioni.component';

@Component({
  selector: 'app-elementi-associati',
  templateUrl: './elementi-associati.component.html',
  styleUrls: ['./elementi-associati.component.css']
})
export class ElementiAssociatiComponent implements OnInit {
  elementi = [];  
  elementiFiltrati=[];
  listaIdContenitori=[];
  @Input() contenitorePadre:number ;
  @Output() numeroElementi = new EventEmitter () ;
  numero:number;

  constructor(private elementService:ElementService,
              private associazioneService:AssociatedService,
              private registroAss: RegistroAssociazioniComponent) { }

  ngOnInit() {
    // come prima cosa azzero la lista "elementiFiltrati"
    this.elementiFiltrati.splice(0, this.elementiFiltrati.length)
    // faccio partire il metodo "filtraElementiAssociati" passandoigli l'id del contenitore in input
    // dall'html del padre
    this.filtraElementiAssociati(this.contenitorePadre);
    // Faccio restare in ascolto della variabile paterna "partenzaMetodo"
    // ogni voltya che questa variabile cambia faccio partire il metodo
    // "filtroElementiAssociati"
    this.registroAss.partezaMetodo.subscribe(()=>{      
      this.filtraElementiAssociati(this.contenitorePadre)})
    }

  filtraElementiAssociati(idContenitore) {   
 
     // Azzero la lista "elementiFiltrati"
    this.elementiFiltrati.splice(0, this.elementiFiltrati.length);
    // uso l'id contenitore per trovare gli elementi che contiene, filtrando "list"
    let elementi = this.elementService.list.filter(e => e.Id_Contenitore == idContenitore);
    // ottenuti gli elementi li ciclo per verificare quale di questi è contenuto anche nella
    // lista "listaFiltroAssociazioni". Se presente in questa lista vuol dire che è un elemento associato
    // al "padre" attualmentge selezionato
    elementi.forEach(element => {
      if (this.associazioneService.listaFiltroAssociazioni.includes(element.IdElemento)) {
        // se l'elemento è contenuto nella "listaFiltroAssociazioni", lo aggiungo
        // ad una lista che poi ciclo (in html) e proiuetto a video
          this.elementiFiltrati.push(element);          
      }
      else { }      
    });
    
    
    
  }

}
