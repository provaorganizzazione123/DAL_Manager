import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ContainerofList';
  listaContenitori = [];
  contenitoriAperti = [];
  @Output() contenitore = new EventEmitter <{id: string, nome: string}> ();
  
  ngOnInit () {
  this.listaContenitori = [
    {nome:"Requisiti",id:"1"},
    {nome:"User Story",id:"2"},
    {nome:"Use Case",id:"3"},
    {nome:"Funzioni",id:"4"},
    {nome:"Features",id:"5"}    
  ]
}

getIdByList(event) {
  /* this.contenitore.emit({id:event.id,nome:event.nome}); */
  this.contenitoriAperti.push({id:event.id,nome:event.nome});
  
}
<<<<<<< Updated upstream
=======

cancellaIdDaLista(event) {
  // evento che passa l'id del contenitore da "container-associated" a "component-list" attraverso la
  // "variabile di appoggio". Questa variabile mi serve perchè al cambiare del suo valore parte
  // l'onChange del component figlio "component-list"
  this.idDaCancellare=event.id;
}

resettaidDaCancellare(event){
  // metodo per resettare la variabile "idDaCancellare", in modo che al suo prossimo cambiamento
  // l'onChange del component figlio "component-list" trovi un nuovo valore e quindi si avvia.
  this.idDaCancellare=event;
}

inserisciElemento(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(InserimentoComponent, dialogConfig);
  }  
>>>>>>> Stashed changes
}
