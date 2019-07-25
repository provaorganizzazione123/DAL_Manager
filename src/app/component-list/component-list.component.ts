import { Component, OnInit, Input, Output, EventEmitter,SimpleChange, OnChanges} from '@angular/core';
import { ElementService } from 'src/app/shared/element.service';
import { AssociatedService } from '../container-associated/associated.service';
import {ContenitoreService} from '../inserimento-contenitore/contenitore.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {
  
@Output() container = new EventEmitter <{id: string, nome: string, colore : string}> ();

listIdContenitoriAperti=[]; 

  constructor(private service:ElementService,
              private serviceCont:ContenitoreService,
              private app: AppComponent) { }

  ngOnInit() {
    // Nell'init del component viene fatto il refresh dei contenitori, un metodo del service che carica da server
    // tutti i contenitori, il subscribe osserva e cattura il segnale emesso al momento di un aggiornamento dei 
    // contenitori e in caso di nuovo aggiornamento (modifica, inserimento, eliminazione) lancia di nuovo il refresh

    this.serviceCont.refreshContenitori();

    this.serviceCont.segnaleAggiornamento.subscribe(()=>{
    this.serviceCont.refreshContenitori();
    });

    // Il subscribe monitora l'emit della propietà IdChiusuraSignal e lancia il metodo AggiornaChiusura al momento
    // della chiusura di un contenitore

    this.app.IdChiusuraSignal.subscribe(signal=>{
    this.AggiornaChiusura(signal);
    })
  }

 espandiContenitore (id,nome,colore) {

  // Metodo che emette in output le proprietà del contenitore che si vuole aprire al momento del click
  // prima esegue un controllo sulla lista dei contenitori aperti per evitare di aprire un contenitore già aperto

   let bool = true;
   for (let index = 0; index < this.listIdContenitoriAperti.length; index++)
   {
     if (this.listIdContenitoriAperti[index] == id)
     {
        bool=false;
        break;
     }    
    }
   if (bool) {
    this.service.filtraLista(id);
    this.listIdContenitoriAperti.push(id);
    this.container.emit({ id:id, nome:nome, colore:colore });
    }
  }

  AggiornaChiusura(id: number){

    // Metodo che viene lanciato all'emissione del segnale di chiusura di un contenitore, elimina dalla lista 
    // dei contenitori aperti l'id del contenitore che si sta chiudendo

    if(id!=0 && this.listIdContenitoriAperti.includes(id)){
        this.listIdContenitoriAperti.splice(this.listIdContenitoriAperti.indexOf(id), 1);
    }
  }
}
