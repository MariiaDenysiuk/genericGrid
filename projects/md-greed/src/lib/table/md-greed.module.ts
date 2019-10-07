import { NgModule } from '@angular/core';
import { MdGreedComponent } from './md-greed.component';
import { MatTableModule } from '@angular/material';

@NgModule({
  declarations: [MdGreedComponent],
  imports: [
    MatTableModule
  ],
  exports: [MdGreedComponent]
})
export class MdGreedModule { }
