import {
  AfterContentChecked, ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Input, isDevMode,
  IterableChangeRecord,
  IterableDiffer,
  IterableDiffers,
  OnInit,
  QueryList, TemplateRef,
  TrackByFunction,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {BaseRowDef, MdCellOutletDirective, MdRowDef} from './rows.component';
import {
  CdkCellOutletMultiRowContext,
  CdkCellOutletRowContext,
  RowOutlet
} from '@angular/cdk/table';

import { Observable, of, Subscription } from 'rxjs';
import { MdColumnDefDirective } from './cells.component';
import {getTableUnknownColumnError} from "@angular/cdk/typings/table/table-errors";
// import {getTableUnknownColumnError} from "@angular/cdk/typings/table/table-errors";

abstract class RowViewRef<T> extends EmbeddedViewRef<RowContext<T>> {}

export interface RowContext<T> extends CdkCellOutletMultiRowContext<T>,
  CdkCellOutletRowContext<T> {}

export interface RenderRow<T> {
  data: T;
  dataIndex: number;
  rowDef: MdRowDef<T>;
}

/**
 * Provides a handle for the table to grab the view container's ng-container to insert data rows.
 * @docs-private
 */
@Directive({selector: '[mdRowOutlet]'})
export class DataRowOutletDirective {
  constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
}


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
export class MdTableComponent<T>  implements OnInit, AfterContentChecked {
  /**
   * Data row definitions that were defined outside of the direct content children of the table.
   * These will be defined when, e.g., creating a wrapper around the cdkTable that has
   * built-in data rows as *its* content child.
   */
  private _customRowDefs = new Set<MdRowDef<T>>();

  private _rowDefs: MdRowDef<T>[];
  private _renderChangeSubscription: Subscription|null;

  /** Latest data provided by the data source. */
  protected _data: T[]|ReadonlyArray<T>;

  /** List of the rendered rows as identified by their `RenderRow` object. */
  private _renderRows: RenderRow<T>[];

  @ContentChildren(MdColumnDefDirective, {descendants: true}) _contentColumnDefs: QueryList<MdColumnDefDirective>;

  /**
   * Cache of the latest rendered `RenderRow` objects as a map for easy retrieval when constructing
   * a new list of `RenderRow` objects for rendering rows. Since the new list is constructed with
   * the cached `RenderRow` objects when possible, the row identity is preserved when the data
   * and row template matches, which allows the `IterableDiffer` to check rows by reference
   * and understand which rows are added/moved/removed.
   *
   * Implemented as a map of maps where the first key is the `data: T` object and the second is the
   * `CdkRowDef<T>` object. With the two keys, the cache points to a `RenderRow<T>` object that
   * contains an array of created pairs. The array is necessary to handle cases where the data
   * array contains multiple duplicate data objects and each instantiated `RenderRow` must be
   * stored.
   */
  private _cachedRenderRowsMap = new Map<T, WeakMap<MdRowDef<T>, RenderRow<T>[]>>();

  /** Differ used to find the changes in the data provided by the data source. */
  private _dataDiffer: IterableDiffer<RenderRow<T>>;

  private _columnDefsByName = new Map<string, MdColumnDefDirective>();


  private _customColumnDefs = new Set<MdColumnDefDirective>();

  protected stickyCssClass = 'md-table-sticky';
  /** Set of data row definitions that were provided to the table as content children. */
  @ContentChildren(MdRowDef) _contentRowDefs;

  // rows inside ng-container
  @ViewChild(DataRowOutletDirective, {static: true}) _rowOutlet: DataRowOutletDirective;

  @Input() dataSource;

  @Input()
  get trackBy(): TrackByFunction<T> {
    return this._trackByFn;
  }
  set trackBy(fn: TrackByFunction<T>) {
    if (isDevMode() && fn != null && typeof fn !== 'function' && <any>console &&
      <any>console.warn) {
      console.warn(`trackBy must be a function, but received ${JSON.stringify(fn)}.`);
    }
    this._trackByFn = fn;
  }
  private _trackByFn: TrackByFunction<T>;

  constructor(  protected readonly _differs: IterableDiffers,  protected readonly _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._dataDiffer = this._differs.find([]).create((_i: number, dataRow: RenderRow<T>) => {
      return this.trackBy ? this.trackBy(dataRow.dataIndex, dataRow.data) : dataRow;
    });
  }

  ngAfterContentChecked(): void {
    // Cache the row and column definitions gathered by ContentChildren and programmatic injection.
    this._cacheRowDefs();
    this._cacheColumnDefs();

    if (this.dataSource && this._rowDefs.length > 0 && !this._renderChangeSubscription) {
      this._observeRenderChanges();
    }
  }

  /** Update the list of all available row definitions that can be used. */
  _cacheRowDefs() {
    this._rowDefs = mergeQueryListAndSet(this._contentRowDefs, this._customRowDefs);
  }

  /** Update the list of all available row definitions that can be used. */
  private _cacheColumnDefs() {
    this._columnDefsByName.clear();

    const columnDefs = mergeQueryListAndSet(this._contentColumnDefs, this._customColumnDefs);
    columnDefs.forEach(columnDef => {

      if (this._columnDefsByName.has(columnDef.name)) {
        // throw getTableDuplicateColumnNameError(columnDef.name);
      }
      this._columnDefsByName.set(columnDef.name, columnDef);
    });
  }


  /** Set up a subscription for the data provided by the data source. */
  _observeRenderChanges() {
    // If no data source has been set, there is nothing to observe for changes.
    if (!this.dataSource) {
      return;
    }

    let dataStream: Observable<T[]|ReadonlyArray<T>>|undefined;

    if (this.dataSource) {
      dataStream = of(this.dataSource);
    }

    dataStream.subscribe(data => {
      this._data = data || [];
      this.renderRows();
    });
  }


  renderRows() {
      this._renderRows = this._getAllRenderRows();
      const changes = this._dataDiffer.diff(this._renderRows);

      if (!changes) {
        return;
      }
      const viewContainer = this._rowOutlet.viewContainer; // container with data rows

      changes.forEachOperation(
        (record: IterableChangeRecord<RenderRow<T>>, prevIndex: number|null,
         currentIndex: number|null) => {
          if (record.previousIndex == null) {
            this._insertRow(record.item, currentIndex!);
          } else if (currentIndex == null) {
            viewContainer.remove(prevIndex!);
          } else {
            const view = <RowViewRef<T>>viewContainer.get(prevIndex!);
            viewContainer.move(view!, currentIndex);
          }
        });

  }

  /**
   * Create the embedded view for the data row template and place it in the correct index location
   * within the data row view container.
   */
  private _insertRow(renderRow: RenderRow<T>, renderIndex: number) {
    const rowDef = renderRow.rowDef;
    const context: RowContext<T> = {$implicit: renderRow.data};

    this._renderRow(this._rowOutlet, rowDef, renderIndex, context);
  }

  _getAllRenderRows() {
    const renderRows: RenderRow<T>[] = [];

    const prevCachedRenderRows = this._cachedRenderRowsMap;
    this._cachedRenderRowsMap = new Map();


    for (let i = 0; i < this._data.length; i++) {
      const data = this._data[i];
      const renderRowsForData = this._getRenderRowsForData(data, i, prevCachedRenderRows.get(data));

      if (!this._cachedRenderRowsMap.has(data)) {
        this._cachedRenderRowsMap.set(data, new WeakMap());
      }

      for (let j = 0; j < renderRowsForData.length; j++) {
        const renderRow = renderRowsForData[j];

        const cache = this._cachedRenderRowsMap.get(renderRow.data)!;
        if (cache.has(renderRow.rowDef)) {
          cache.get(renderRow.rowDef)!.push(renderRow);
        } else {
          cache.set(renderRow.rowDef, [renderRow]);
        }
        renderRows.push(renderRow);
      }
    }
    return renderRows;
  }


  /**
   * Gets a list of `RenderRow<T>` for the provided data object and any `CdkRowDef` objects that
   * should be rendered for this data. Reuses the cached RenderRow objects if they match the same
   * `(T, CdkRowDef)` pair.
   */

  private _getRenderRowsForData(data: T, dataIndex: number, cache?: WeakMap<MdRowDef<T>, RenderRow<T>[]>): any {
    const rowDefs = this._getRowDefs(data, dataIndex);


    return rowDefs.map(rowDef => {
      const cachedRenderRows = (cache && cache.has(rowDef)) ? cache.get(rowDef)! : [];
      if (cachedRenderRows.length) {
        const dataRow = cachedRenderRows.shift()!;
        dataRow.dataIndex = dataIndex;
        return dataRow;
      } else {
        return {data, rowDef, dataIndex};
      }
    });

  }

  _getRowDefs(data: T, dataIndex: number): MdRowDef<T>[] {
    if (this._rowDefs.length === 1) {
      return [this._rowDefs[0]];
    }

    const rowDefs: MdRowDef<T>[] = [];

    const rowDef = this._rowDefs.find(def => def.when && def.when(dataIndex, data));
      if (rowDef) {
        rowDefs.push(rowDef);
    }

    return rowDefs;
  }


  private _renderRow(
    outlet: RowOutlet, rowDef: BaseRowDef, index: number, context: RowContext<T> = {}) {
    // TODO(andrewseguin): enforce that one outlet was instantiated from createEmbeddedView

    outlet.viewContainer.createEmbeddedView(rowDef.template, context, index);

    for (const cellTemplate of this._getCellTemplates(rowDef)) {
      if (MdCellOutletDirective.mostRecentCellOutlet) {
        MdCellOutletDirective.mostRecentCellOutlet._viewContainer.createEmbeddedView(cellTemplate, context);
      }
    }

    this._changeDetectorRef.markForCheck();
  }

  /** Gets the column definitions for the provided row def. */
  private _getCellTemplates(rowDef: BaseRowDef): TemplateRef<any>[] {
    if (!rowDef || !rowDef.columns) {
      return [];
    }
    return Array.from(rowDef.columns, columnId => {
      const column = this._columnDefsByName.get(columnId);
      if (!column) {
      //  todo==================
      }

      return rowDef.extractCellTemplate(column);
    });
  }


}

/** Utility function that gets a merged list of the entries in a QueryList and values of a Set. */
function mergeQueryListAndSet<T>(queryList: QueryList<T>, set: Set<T>): T[] {
  return queryList.toArray().concat(Array.from(set));
}



