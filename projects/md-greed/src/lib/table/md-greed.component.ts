import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DataService } from '../services/data.service';
import { PeriodicElement } from '../models/data.model';

@Component({
  selector: 'md-greed',
  templateUrl: './md-greed.component.html',
})
export class MdGreedComponent implements OnInit, AfterContentInit, AfterViewInit {
  // @ViewChild('rr', {read: ElementRef, static: false }) tref: ElementRef;
  // @ViewChild('vc', {read: ViewContainerRef, static: false }) vc: ViewContainerRef;
  // @ViewChild('temp', {read: TemplateRef, static: false }) temp: TemplateRef<any>;


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource: any = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];



  constructor(private data: DataService, private el: ElementRef) {
    // this.dataSource = this.data.getData();
  }
  ngOnInit() {
    console.log(this.el.nativeElement.outerHTML);
  }

  ngAfterViewInit(): void {
    // outputs `I am span`
    // console.log('begin');
    // console.log(this.tref);
    // console.log(this.vc);
    // console.log(this.temp);
  }

  ngAfterContentInit() {
    // this.footer now points to the instance of `FooterComponent`
    // console.log(this.footer);
  }
}
