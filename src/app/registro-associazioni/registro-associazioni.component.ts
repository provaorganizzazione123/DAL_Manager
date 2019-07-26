import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { AssociatedService } from '../container-associated/associated.service';
import { ElementService } from '../shared/element.service'
import { Element } from '../shared/element.model';
import { ContenitoreService } from '../inserimento-contenitore/contenitore.service';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { debug } from 'util';

@Component({
  selector: 'app-registro-associazioni',
  templateUrl: './registro-associazioni.component.html',
  styleUrls: ['./registro-associazioni.component.css']
})
export class RegistroAssociazioniComponent implements OnInit {
/*--------Dichiarazioni Variabili --------------*/

  Padre;
  contenitorePadre;
  contenitori = [];
  listaElementiAssociati = [];
  partezaMetodo: EventEmitter<boolean>; 
 
  /*-------------------------------------------*/





  constructor(private associazioneService: AssociatedService,
    private contenitoreService: ContenitoreService,
    private elementService: ElementService, ) {
    this.partezaMetodo = new EventEmitter<boolean>(true);
  }

  ngOnInit() {
    // nell'onInit tengo sotto controllo la variabile "segnaleRegistro", che cambia ogni volta che seleziono 
    // un nuovo elemento "Padre",e gli azzero la lista dei contenitori e gli faccio partire il metodo "carica"
    this.elementService.segnaleRegistro.subscribe(num => {
      if (num == 0) {
        this.contenitori.splice(0, this.contenitori.length);
        this.carica();
      }
      else if (num == 1) {
        this.contenitori.splice(0, this.contenitori.length);
       this.Padre.splice(0, this.Padre.length);
      }
    });
  }



  carica() {    
    // come prima cosa prendo l'id del padre dal services associazione
    let id = this.associazioneService.IdPadreSelezionato;
    // prendo l'id e lo uso per4 filtrarmi "list" (che è la lista di tutti gli elementi),
    // metto l'elemento in una variabile (Padre) che poi proietto a video
    this.Padre = this.elementService.list.filter(e => e.IdElemento == id);    
    // ciclo la lista "listaFiltroAssociazioni" (che contiene gli id degli elementi associati a "Padre")
    let elemento = this.elementService.list.filter(e => e.IdElemento == id)[0];
    this.contenitorePadre = this.contenitoreService.listaContenitori.filter(e=>e.Id_Contenitore == elemento.Id_Contenitore)[0];
    // Grazie al "Padre" mi filtro la lista contenitori e mi ricavo il contenitore di cui fa parte
    //per poterlo proiettare a video.
    
          
      
    this.associazioneService.listaFiltroAssociazioni.forEach(element => {
      // in base all'id mi vado a riprendere l'elemento completo da "list"
      let elemento = this.elementService.list.filter(e => e.IdElemento == element)[0];
      // dall'elemento me ne ricavo l'id del contenitore, e lo uso per andarmi a riprendere tutto 
      // l'oggetto conenitore dalla lista dei contenitori (listaContenitori)
      let contenitore = this.contenitoreService.listaContenitori.filter(e => e.Id_Contenitore == elemento.Id_Contenitore)[0];
      // controllo se il contenitore è gia presente nella lista "Contenitori" 


      if (this.contenitori.includes(contenitore)) { }
      // se non presente faccio il push del contenitore nella sua lista
      else {
        this.contenitori.push(contenitore)
       
       };
      
      // faccio un emit, perchè in base a questa variabile mi riparte più volte il metodo
      // "filtraElementiAssociati" del component elementi-associati    
      this.partezaMetodo.emit(false);
    });
  }

  Espandi(id,id1){
    // Questo metodo al primo click fa le istruzionio che seguono, al secondo in automatico
    // fa le operazioni inverse. Quindi al primo click da le classi "active1" e "caret"
    // al secondo le toglie
    let ramo = document.getElementById(id);
    // prendo l'oggetto che mi dovrà apparire (div) grazie all'id
    ramo.classList.toggle('active1');   
    //gli do la classe "active1" che mi cambia il display da none a block
    let contenitore = document.getElementById(id1);
    // Qui prendo il contenitore sempre attraverso l'id
    // N.B. l'idi di questo contenitore è formato da una concatenzaione tra il nome e l'id del 
    // contenitore stesso, questo per non andare in conflitto con gli altri id di contenitori ed
    // elementi presenti nel dom.  
    contenitore.classList.toggle('caret'); 
    // assegno al contenitore la classe "caret".
      
    }

  
}

