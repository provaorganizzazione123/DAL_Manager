import { BrowserModule } from '@angular/platform-browser';

import { NgModule, SchemaMetadata } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {ToastrModule} from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerAssociatedComponent } from './container-associated/container-associated.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ComponentListComponent } from './component-list/component-list.component';

import { RegistroAssociazioniComponent } from './registro-associazioni/registro-associazioni.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ElementService } from './shared/element.service';
import { ElementComponent } from './container-associated/element/element.component';


@NgModule({
  declarations: [
    AppComponent,
    ContainerAssociatedComponent,
    ComponentListComponent,
    RegistroAssociazioniComponent,
    ElementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ElementService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
export class PizzaPartyAppModule { }
