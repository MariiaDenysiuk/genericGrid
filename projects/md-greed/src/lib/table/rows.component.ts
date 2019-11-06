import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input, IterableChanges, IterableDiffer, IterableDiffers, OnChanges, OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { MdCellDefDirective, MdColumnDefDirective } from './cells.component';
/* tslint:disable */
/**
 * Header row definition for the mat-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
// @Directive({
//   selector: '[mdHeaderRowDef]',
//   providers: [{provide: CdkHeaderRowDef, useExisting: MdHeaderRowDef}],
//   inputs: ['columns: mdHeaderRowDef', 'sticky: mdHeaderRowDefSticky'],
// })
// export class MdHeaderRowDef extends CdkHeaderRowDef {
// }

/**
 * Footer row definition for the mat-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
// @Directive({
//   selector: '[mdFooterRowDef]',
//   providers: [{provide: CdkFooterRowDef, useExisting: MdFooterRowDef}],
//   inputs: ['columns: matFooterRowDef', 'sticky: matFooterRowDefSticky'],
// })
// export class MdFooterRowDef extends CdkFooterRowDef {
// }

/**
 * Data row definition for the mat-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */


/** Footer template container that contains the cell outlet. Adds the right class and role. */
// @Component({
//   selector: 'md-header-row, tr[md-header-row]',
//   template: CDK_ROW_TEMPLATE,
//   host: {
//     'class': 'md-header-row',
//     'role': 'row',
//   },
//   // See note on CdkTable for explanation on why this uses the default change detection strategy.
//   // tslint:disable-next-line:validate-decorators
//   changeDetection: ChangeDetectionStrategy.Default,
//   encapsulation: ViewEncapsulation.None,
//   exportAs: 'mdHeaderRow',
//   providers: [{provide: CdkHeaderRow, useExisting: MdHeaderRow}],
// })
// export class MdHeaderRow extends CdkHeaderRow {
// }



/**
 * Base class for the CdkHeaderRowDef and CdkRowDef that handles checking their columns inputs
 * for changes and notifying the table.
 */
export abstract class BaseRowDef implements OnChanges {
  /** The columns to be displayed on this row. */
  columns: Iterable<string>;

  /** Differ used to check if any changes were made to the columns. */
  protected _columnsDiffer: IterableDiffer<any>;

  constructor(
    /** @docs-private */ public template: TemplateRef<any>, protected _differs: IterableDiffers) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Create a new columns differ if one does not yet exist. Initialize it based on initial value
    // of the columns property or an empty array if none is provided.
    if (!this._columnsDiffer) {
      const columns = (changes['columns'] && changes['columns'].currentValue) || [];
      this._columnsDiffer = this._differs.find(columns).create();
      this._columnsDiffer.diff(columns);
    }
  }

  /**
   * Returns the difference between the current columns and the columns from the last diff, or null
   * if there is no difference.
   */
  getColumnsDiff(): IterableChanges<any>|null {
    return this._columnsDiffer.diff(this.columns);
  }

  /** Gets this row def's relevant cell template from the provided column def. */
  extractCellTemplate(column: MdColumnDefDirective): TemplateRef<any> {
    // if (this instanceof CdkHeaderRowDef) {
    //   // return column.headerCell.template;
    // }
    // if (this instanceof CdkFooterRowDef) {
    //   // return column.footerCell.template;
    // } else {
      console.log(column.cell.template);
      return column.cell.template;
    // }
  }
}


// cdk row definitions-----------------------------------------------------
@Directive({
  selector: '[mdRowDef]',
  inputs: ['columns: mdRowDefColumns', 'when: mdRowDefWhen'],
})
export class MdRowDef<T> extends BaseRowDef  {
  constructor(template: TemplateRef<any>, _differs: IterableDiffers) {
    super(template, _differs);
  }

  columns: Iterable<string>;
  when: (index: number, rowData: T) => boolean;

  @Input() set mdRowDef(condition: boolean) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.columns);
  }
}

// directive for outer
@Directive({selector: '[mdCellOutlet]'})
export class MdCellOutletDirective implements OnDestroy {
  /** The ordered list of cells to render within this outlet's view container */
  cells: MdCellDefDirective[];

  /** The data context to be provided to each cell */
  context: any;

  /**
   * Static property containing the latest constructed instance of this class.
   * Used by the CDK table when each CdkHeaderRow and CdkRow component is created using
   * createEmbeddedView. After one of these components are created, this property will provide
   * a handle to provide that component's cells and context. After init, the CdkCellOutlet will
   * construct the cells with the provided context.
   */
  static mostRecentCellOutlet: MdCellOutletDirective|null = null;

  constructor(public _viewContainer: ViewContainerRef) {
    MdCellOutletDirective.mostRecentCellOutlet = this;

  }

  ngOnDestroy() {
    // If this was the last outlet being rendered in the view, remove the reference
    // from the static property after it has been destroyed to avoid leaking memory.
    if (MdCellOutletDirective.mostRecentCellOutlet === this) {
      MdCellOutletDirective.mostRecentCellOutlet = null;
    }
  }
}


/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'md-row, tr[md-row]',
  template: `<ng-container mdCellOutlet></ng-container>`,
  host: {
    'class': 'md-row',
    'role': 'row',
  },
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  // exportAs: 'mdRow',
  // providers: [{provide: CdkRow, useExisting: MdRow}],
})
export class MdRow  {
}
