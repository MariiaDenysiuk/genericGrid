import { NgModule } from '@angular/core';
import { MdGreedComponent } from './md-greed.component';
import { MatInputModule, MatTableModule } from '@angular/material';
import { MdContainerGreedComponent } from './md-container-greed.component';
import { BrowserModule } from '@angular/platform-browser';
import { InputOutlet, InputsTempComponent } from './inputs-temp/inputs-temp.component';

@NgModule({
  declarations: [MdGreedComponent, MdContainerGreedComponent, InputsTempComponent, InputOutlet],
  imports: [
    MatTableModule, MatInputModule, BrowserModule
  ],
  exports: [MdGreedComponent, InputOutlet]
})
export class MdGreedModule { }
