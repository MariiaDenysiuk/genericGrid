import { NgModule } from '@angular/core';
import { MdGreedComponent } from './md-greed.component';
import { MatInputModule, MatTableModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { DataRowOutletDirective, MdTableComponent } from './table/table.component';
import { MdFooterRowDef, MdHeaderRow, MdHeaderRowDef, MdRow, MdRowDef } from './rows/rows.component';

@NgModule({
  declarations: [MdGreedComponent, MdTableComponent, MdRow,
    MdRowDef, MdFooterRowDef, MdHeaderRowDef, MdHeaderRow, DataRowOutletDirective],
  imports: [
    MatTableModule, MatInputModule, BrowserModule,
  ],
  exports: [MdGreedComponent, MdTableComponent, MdRow, MdRowDef, MdFooterRowDef, MdHeaderRowDef, MdHeaderRow, DataRowOutletDirective],
})
export class MdGreedModule { }
