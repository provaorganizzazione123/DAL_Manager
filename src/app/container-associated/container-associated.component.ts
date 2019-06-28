
import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { ComponentListComponent } from '../component-list/component-list.component';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-container-associated',
  templateUrl: './container-associated.component.html',
  styleUrls: ['./container-associated.component.css']
})
export class ContainerAssociatedComponent implements OnInit {
 @Input () contenitoriAperti;
 @Input () element : Element;
 @Output () idContenitoreChiuso= new EventEmitter  ();
 listElement = [
  {nome:"elemento 1",id:"1"},
  {nome:"elemento 2",id:"2"},
  {nome:"elemento 3",id:"3"},
  {nome:"elemento 4",id:"4"},
  {nome:"elemento 5",id:"5"}    
  ]
  constructor() { }

  ngOnInit() {
  }

  chiudiContainer(contId) {
    let box = document.getElementById(contId);
     box.parentNode.removeChild(box);
    this.idContenitoreChiuso.emit({id:contId});

     }
  
}
