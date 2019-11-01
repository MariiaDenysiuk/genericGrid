import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input, OnChanges,
  OnInit, SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {CDK_ROW_TEMPLATE, CdkFooterRowDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef} from '@angular/cdk/table';
/* tslint:disable */
/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
  selector: '[mdHeaderRowDef]',
  providers: [{provide: CdkHeaderRowDef, useExisting: MdHeaderRowDef}],
  inputs: ['columns: mdHeaderRowDef', 'sticky: mdHeaderRowDefSticky'],
})
export class MdHeaderRowDef extends CdkHeaderRowDef {
}

/**
 * Footer row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
@Directive({
  selector: '[mdFooterRowDef]',
  providers: [{provide: CdkFooterRowDef, useExisting: MdFooterRowDef}],
  inputs: ['columns: matFooterRowDef', 'sticky: matFooterRowDefSticky'],
})
export class MdFooterRowDef extends CdkFooterRowDef {
}

/**
 * Data row definition for the mat-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */


/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'md-header-row, tr[md-header-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'md-header-row',
    'role': 'row',
  },
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'mdHeaderRow',
  providers: [{provide: CdkHeaderRow, useExisting: MdHeaderRow}],
})
export class MdHeaderRow extends CdkHeaderRow {
}

@Directive({
  selector: '[mdRowDef]',
  inputs: ['columns: mdRowDefColumns', 'when: mdRowDefWhen'],
})
export class MdRowDef<T> implements OnChanges {
  constructor(private container: ViewContainerRef,
              private template: TemplateRef<any>,
  ) { }

  columns: Iterable<string>;
  when: (index: number, rowData: T) => boolean;

  @Input() set mdRowDef(condition: boolean) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.columns);
  }
}


/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'md-row, tr[md-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    'class': 'md-row',
    'role': 'row',
  },
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'mdRow',
  // providers: [{provide: CdkRow, useExisting: MdRow}],
})
export class MdRow  {
}
