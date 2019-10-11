import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PeriodicElement } from '../models/data.model';

@Component({
  selector: 'md-greed',
  templateUrl: './md-greed.component.html',
  styleUrls: ['./md-greed.component.sass'],
})
export class MdGreedComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[];
  openEditModes = false;
  constructor(private data: DataService) {
    this.dataSource = this.data.getData();
  }
  ngOnInit() {}
  openEditMode(ev) {
     this.openEditModes = !this.openEditModes;
  }
}
