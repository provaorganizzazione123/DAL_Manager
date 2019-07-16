import { Component, OnInit, Input, Output, EventEmitter,SimpleChange
 } from '@angular/core';
 import { ElementService } from 'src/app/shared/element.service';
import { AssociatedService } from '../container-associated/associated.service';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {
@Input () ListaContenitore;
@Input() idDelete;
@Output() container = new EventEmitter <{id: string, nome: string}> ();
@Output () idCancellato = new EventEmitter () ;
listId=[]; 

  constructor(private service:ElementService, private assService: AssociatedService) { }

  ngOnInit() {
    this.service.refreshContenitori()
  }

 espandiContenitore (id,nome) {
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
    this.container.emit({ id:id, nome:nome });
    
    }
  }
                                

 ngOnChanges (changes: {[idDelete: string]:SimpleChange}){

 if(this.idDelete==0){console.log('ciao')}
else{ 
      if (this.listId.includes(this.idDelete)){                  // ho messo un if su listId perchè l'onchanges parte anche quando cambia questa proprietà
                                                                 // ma quando cambia listId l'onChanges non deve fare niente, deve cancellare l'id
                                                                 // solo quando lo include, altrimenti la lista si resetterebbe sembre e si potrebbe aprire 
                                                                 // N volte lo stesso contenitore.
          this.listId.splice(this.listId.indexOf(this.idDelete), 1);
          this.idCancellato.emit(0);}
      else{}
   // l'onChanges parte quando la variabile (idDaCancellare) del component padre (app-component)cambia.
   // per far si che la variabile "idDaCancellare" cambi sempre e quindi azioni sempre l'onChange
   // ho bisogno di resettarla. Quindi faccio un emit da qui e scateno l'evento che richiama il
   //metodo del padre "resettaidDaCancellare"  
    }
  }

}
