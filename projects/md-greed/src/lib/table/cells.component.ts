/**
 * Column definition for the CDK table.
 * Defines a set of cells available for a table column.
 */
import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

export interface CellDef {
  template: TemplateRef<any>;
}

/**
 * Cell definition for a CDK table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({selector: '[mdCellDef]'})
export class MdCellDefDirective implements CellDef {
  constructor(public template: TemplateRef<any>) {

  }
}


@Directive({
  selector: '[mdColumnDef]',
  /* tslint:disable */
  inputs: ['sticky'],
  /* tslint:enable */
  // providers: [{provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: MdColumnDefDirective}],
})
export class MdColumnDefDirective  {
  _name: string;
  /** Unique name for this column. */
  @Input('mdColumnDef')
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    // If the directive is set without a name (updated programatically), then this setter will
    // trigger with an empty string and should not overwrite the programatically set value.
    if (!name) {
      return;
    }

    this._name = name;
    this.cssClassFriendlyName = name.replace(/[^a-z0-9_-]/ig, '-');
  }


  /**
   * Whether this column should be sticky positioned on the end of the row. Should make sure
   * that it mimics the `CanStick` mixin such that `_hasStickyChanged` is set to true if the value
   * has been changed.
   */
  @Input('stickyEnd')
  get stickyEnd(): boolean {
    return this._stickyEnd;
  }
  // set stickyEnd(v: boolean) {
  //   const prevValue = this._stickyEnd;
  //   this._stickyEnd = coerceBooleanProperty(v);
  //   this._hasStickyChanged = prevValue !== this._stickyEnd;
  // }
  _stickyEnd = false;

  /** @docs-private */
  @ContentChild(MdCellDefDirective, {static: false}) cell: MdCellDefDirective;

  // /** @docs-private */
  // @ContentChild(CdkHeaderCellDef) headerCell: CdkHeaderCellDef;
  //
  // /** @docs-private */
  // @ContentChild(CdkFooterCellDef) footerCell: CdkFooterCellDef;

  /**
   * Transformed version of the column name that can be used as part of a CSS classname. Excludes
   * all non-alphanumeric characters and the special characters '-' and '_'. Any characters that
   * do not match are replaced by the '-' character.
   */
  cssClassFriendlyName: string;
}
