import {
  AfterContentInit,
  AfterViewInit,
  Component, ContentChildren, Directive, ElementRef,
  Input, OnInit, QueryList, ViewContainerRef,
} from '@angular/core';
import {MdRowDef} from '../rows/rows.component';

@Component({
  selector: 'md-table, table[md-table]',
  template: `<ng-content select="caption"></ng-content>
             <ng-container headerRowOutlet></ng-container>
             <ng-container mdRowOutlet></ng-container>
             <ng-container footerRowOutlet></ng-container>`,
  /* tslint:disable */
  host: {
    'class': 'md-table',
  },
  /* tslint:enable */
  // providers: [{provide: CdkTable, useExisting: MdTableComponent}],
  // No Shadow DOM at all. Therefore, also no style encapsulation.
  // encapsulation: ViewEncapsulation.None,
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class MdTableComponent<T>  implements OnInit, AfterViewInit, AfterContentInit {
  protected stickyCssClass = 'md-table-sticky';
  /** Set of data row definitions that were provided to the table as content children. */
  @ContentChildren(MdRowDef) _contentRowDefs: QueryList<MdRowDef<T>>;
  @Input() dataSource;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // console.log(this._jin.elementRef);
  }

  ngAfterContentInit(): void {
      console.log(this._contentRowDefs);
  }

}


/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
@Directive({selector: '[mdRowOutlet]'})
export class DataRowOutletDirective {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}



