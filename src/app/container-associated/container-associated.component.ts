import { Component, OnInit,Input } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-container-associated',
  templateUrl: './container-associated.component.html',
  styleUrls: ['./container-associated.component.css']
})
export class ContainerAssociatedComponent implements OnInit {
 @Input () contenitoriAperti;
 @Input () element : Element;
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

  

}
