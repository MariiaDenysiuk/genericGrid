import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PeriodicElement } from '../models/data.model';

@Component({
  selector: 'lib-md-greed',
  templateUrl: './md-greed.component.html',
  styleUrls: ['./md-greed.component.sass'],
})
export class MdGreedComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[];
  constructor(private data: DataService) {
    this.dataSource = this.data.getData();
  }
  ngOnInit() {}
}
