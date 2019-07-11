import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { ComponentListComponent } from '../component-list/component-list.component';
import { ElementService } from 'src/app/shared/element.service';
import { Element } from 'src/app/shared/element.model';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Interpolation } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { AssociatedService } from './associated.service';
//import { ToastrService } from 'ngx-toastr';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-container-associated',
  templateUrl: './container-associated.component.html',
  
  styleUrls: ['./container-associated.component.css']
})
export class ContainerAssociatedComponent implements OnInit {
 @Input () contenitoriAperti;
 listEleCont :Element[];
 prova = document.getElementById('#proviamolo')

 

 @Output () idContenitoreChiuso= new EventEmitter  ();
  
 constructor( private service: ElementService,
              private assService: AssociatedService,
              private http: HttpClient) { }

  ngOnInit() {  
  }

  chiudiContainer(contId) {
    let box = document.getElementById(contId);
     box.parentNode.removeChild(box);
    this.idContenitoreChiuso.emit({id:contId});
    }

    creaAssociazione(){

        /*for(let i = 0; i < this.listaIdElementi.length; i++){

        }*/

        this.assService.PostAssociazione().subscribe(
          res => {         
          console.log('Inserimento avvenuto con successo', 'GRANDE');
          console.log(res);
        });
    }
    
    /* PostAssociazione(listaId: number[]){
      return this.http.post("http://localhost:60537/api/Associazione", this.assService.listaIdElementi);
    } */
    

    aggiungiIdElementoALista(id){
      // metodo che riceve l'id dell'elemento da associare dal componente "element" e lo aggiunge 
      // ad una lista di id da associare
      if (this.assService.listaIdElementi.includes(id)){
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
          console.log(this.assService.listaIdElementi)
        }
        else{
          // quindi se l'indice dell'id è diverso da zero, l'id deve essere eliminato dalla lista
        this.assService.listaIdElementi.splice(this.assService.listaIdElementi.indexOf(id),1);
        console.log(this.assService.listaIdElementi)
        }
      }
      else {
        // se l'id non è presente nella lista, posso procedere con il push dell'id
      this.assService.listaIdElementi.push(id);
      console.log(this.assService.listaIdElementi)
      }
    }
} 