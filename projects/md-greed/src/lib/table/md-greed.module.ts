import { NgModule } from '@angular/core';
import { MdGreedComponent } from './md-greed.component';
import { MatInputModule, MatTableModule } from '@angular/material';
import { MdContainerGreedComponent } from './md-container-greed.component';
import { BrowserModule } from '@angular/platform-browser';
import { MdTableComponent } from './table/table.component';
import { RowsComponent } from './rows/rows.component';
import { MdTableDataSource } from './table-data-source/table-data-source.component';

@NgModule({
  declarations: [MdGreedComponent, MdContainerGreedComponent, MdTableComponent, RowsComponent, MdTableDataSource],
  imports: [
    MatTableModule, MatInputModule, BrowserModule
  ],
  exports: [MdGreedComponent, MdTableComponent],
})
export class MdGreedModule { }
