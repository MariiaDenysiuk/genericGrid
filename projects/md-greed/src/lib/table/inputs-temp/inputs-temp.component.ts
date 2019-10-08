import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  OnInit,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {CdkRow} from '@angular/cdk/table';
import { MatRow } from '@angular/material';

const CDK_ROW_TEMPLATE = `<ng-container inputOutlet></ng-container>`;

@Component({
  styleUrls: ['./inputs-temp.component.css'],
  moduleId: '1',
  selector: 'lib-inputs-temp, div[lib-inputs-temp]',
  template: CDK_ROW_TEMPLATE,
  /* tslint:disable */
  host: {
    'class': 'mat-row',
    'role': 'row',
  },
  /* tslint:enable */
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'matRow',
  providers: [{provide: CdkRow, useExisting: MatRow}],
})
export class InputsTempComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}

/* tslint:disable */
@Directive({selector: '[inputOutlet]'})
export class InputOutlet  {

  constructor(public _viewContainer: ViewContainerRef) {
    console.log(this._viewContainer)
  }

}
/* tslint:enable */
