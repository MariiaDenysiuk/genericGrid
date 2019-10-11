import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PeriodicElement } from '../models/data.model';

@Component({
  selector: 'md-container-greed',
  templateUrl: './md-container-greed.component.html',
  styleUrls: ['./md-greed.component.sass'],
})
export class MdContainerGreedComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[];
  constructor(private data: DataService) {
    this.dataSource = this.data.getData();
  }
  ngOnInit() {}
}
