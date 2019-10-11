import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CDK_TABLE_TEMPLATE, CdkTable} from '@angular/cdk/table';

@Component({
  selector: 'md-table, table[md-table]',
  exportAs: 'mdTable',
  template: CDK_TABLE_TEMPLATE,
  styleUrls: ['table.component.css'],
  /* tslint:disable */
  host: {
    'class': 'md-table',
  },
  /* tslint:enable */
  providers: [{provide: CdkTable, useExisting: MdTableComponent}],
  // No Shadow DOM at all. Therefore, also no style encapsulation.
  encapsulation: ViewEncapsulation.None,
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MdTableComponent<T> extends CdkTable<T> {
  protected stickyCssClass = 'md-table-sticky';


}
