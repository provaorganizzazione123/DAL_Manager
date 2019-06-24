import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-container-associated',
  templateUrl: './container-associated.component.html',
  styleUrls: ['./container-associated.component.css']
})
export class ContainerAssociatedComponent implements OnInit {
 @Input () id_contenitore : string;
  constructor() { }

  ngOnInit() {
  }

}
