import { BrowserModule } from '@angular/platform-browser';

import { NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {MatButtonModule, MatCheckboxModule, MatDialog} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerAssociatedComponent } from './container-associated/container-associated.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ComponentListComponent } from './component-list/component-list.component';

import { RegistroAssociazioniComponent } from './registro-associazioni/registro-associazioni.component';
import { CommonModule } from '@angular/common';
import { ElementService } from './shared/element.service';
import { ElementComponent } from './container-associated/element/element.component';
import { InserimentoComponent } from './inserimento/inserimento.component';
import * as Material from "@angular/material";

import { AssociatedService } from './container-associated/associated.service';
import { EliminazioneComponent } from './container-associated/element/eliminazione/eliminazione.component';
import { ModificaComponent } from './container-associated/element/modifica/modifica.component';
import { DettaglioComponent } from './container-associated/element/dettaglio/dettaglio.component';
import { InserimentoContenitoreComponent } from './inserimento-contenitore/inserimento-contenitore.component';
import { ElementiAssociatiComponent } from './registro-associazioni/elementi-associati/elementi-associati.component';
import { MenuFiltriContenitoreComponent } from './container-associated/menu-filtri-contenitore/menu-filtri-contenitore.component';



@NgModule({
  declarations: [
    AppComponent,
    ContainerAssociatedComponent,
    ComponentListComponent,
    RegistroAssociazioniComponent,
    ElementComponent,
    InserimentoComponent,
    EliminazioneComponent,
    ModificaComponent,
    DettaglioComponent,
    InserimentoContenitoreComponent,
    ElementiAssociatiComponent,
    MenuFiltriContenitoreComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule,
    Material.MatIconModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }
    ),
    
   
   
  ],
  exports:[
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule,
    Material.MatIconModule

  ],
  providers: [ElementService,
              AssociatedService],
  bootstrap: [AppComponent],
  entryComponents:[
     InserimentoComponent, 
     EliminazioneComponent,
     ModificaComponent, 
     DettaglioComponent,
     InserimentoContenitoreComponent]
})
export class AppModule {

}
export class PizzaPartyAppModule { }
