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

listId=[]; 

  constructor(private service:ElementService,
              private assService: AssociatedService,
              private serviceCont:ContenitoreService,
              private app: AppComponent) { }

  ngOnInit() {
    this.serviceCont.refreshContenitori();
    this.serviceCont.segnaleAggiornamento.subscribe(()=>{
    this.serviceCont.refreshContenitori();
  });

  this.app.IdChiusuraSignal.subscribe(sig=>{
    this.AggiornaChiusura(sig);
  })
  }

 espandiContenitore (id,nome,colore) {

   let bool = true;
   for (let index = 0; index < this.listId.length; index++)
   {
     const element = this.listId[index];
     if (element == id)
     {
        bool=false;
        break;
     }    
    }
   if (bool) {
    this.service.filtraLista(id);
    this.listId.push(id);
    this.container.emit({ id:id, nome:nome, colore:colore });
    }
  }

  AggiornaChiusura(id: number){
    if(id!=0 && this.listId.includes(id)){
        this.listId.splice(this.listId.indexOf(id), 1);
    }
  }
}
