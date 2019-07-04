import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { ComponentListComponent } from '../component-list/component-list.component';
import { ElementService } from 'src/app/shared/element.service';
import { Element } from 'src/app/shared/element.model';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Interpolation } from '@angular/compiler';
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

 //@Input () element : Element;
 @Output () idContenitoreChiuso= new EventEmitter  ();
 //listElement :Element[];
  constructor( private service: ElementService) { }

  ngOnInit() {
    //this.service.refreshList();
  }

  
  
  

  chiudiContainer(contId) {
    let box = document.getElementById(contId);
     box.parentNode.removeChild(box);
    this.idContenitoreChiuso.emit({id:contId});

     }
  
    


} 