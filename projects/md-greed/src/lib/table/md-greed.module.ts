import { NgModule } from '@angular/core';
import { MdGreedComponent } from './md-greed.component';
import { MatInputModule, MatTableModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { DataRowOutletDirective, MdTableComponent } from './table.component';
import { MdCellOutletDirective, MdRow, MdRowDef } from './rows.component';
import { MdCellDefDirective, MdColumnDefDirective } from './cells.component';

@NgModule({
  declarations: [MdGreedComponent, MdTableComponent, MdRow,
    MdRowDef, DataRowOutletDirective, MdCellOutletDirective, MdCellDefDirective, MdColumnDefDirective],
  imports: [
    MatTableModule, MatInputModule, BrowserModule,
  ],
  exports: [ MdGreedComponent, MdTableComponent, MdRow, MdRowDef,
    DataRowOutletDirective, MdCellOutletDirective, MdCellDefDirective, MdColumnDefDirective ],
})
export class MdGreedModule { }
