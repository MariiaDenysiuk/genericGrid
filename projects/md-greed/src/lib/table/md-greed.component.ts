import {AfterContentInit, Component, OnInit} from '@angular/core';
import { DataService } from '../services/data.service';
import { PeriodicElement } from '../models/data.model';

@Component({
  selector: 'md-greed',
  templateUrl: './md-greed.component.html',
})
export class MdGreedComponent implements OnInit, AfterContentInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[];
  constructor(private data: DataService) {
    this.dataSource = this.data.getData();
  }
  ngOnInit() {}

  ngAfterContentInit() {
    // this.footer now points to the instance of `FooterComponent`
    // console.log(this.footer);
  }
}
