import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SchemaMetadata } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerAssociatedComponent } from './container-associated/container-associated.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ComponentListComponent } from './component-list/component-list.component';
import { RegistroAssociazioniComponent } from './registro-associazioni/registro-associazioni.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContainerAssociatedComponent,
    ComponentListComponent,
    RegistroAssociazioniComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
export class PizzaPartyAppModule { }
