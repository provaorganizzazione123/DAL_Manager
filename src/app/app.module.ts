import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerAssociatedComponent } from './container-associated/container-associated.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ComponentListComponent } from './component-list/component-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerAssociatedComponent,
    ComponentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
