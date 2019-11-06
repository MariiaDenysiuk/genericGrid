import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GreedComponent } from './components/greed/greed.component';
import { MatTableModule } from '@angular/material';
import { MdGreedModule } from '../../projects/md-greed/src/lib/table/md-greed.module';

@NgModule({
  declarations: [
    AppComponent,
    GreedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MdGreedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
