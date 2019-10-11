import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';

export class MdTableDataSource<T> extends DataSource<T> {

  constructor(initialData: T[] = []) {
    super();
    this._data = new BehaviorSubject<T[]>(initialData);
    this._updateChangeSubscription();
  }

  /** Array of data that should be rendered by the table, where each object represents one row. */
  get data() { return this._data.value; }
  set data(data: T[]) { this._data.next(data); }

  /** Stream that emits when a new data array is set on the data source. */
  private readonly _data: BehaviorSubject<T[]>;

  /** Stream emitting render data to the table (depends on ordered data changes). */
  private readonly _renderData = new BehaviorSubject<T[]>([]);

  _updateChangeSubscription() {
    const dataStream = this._data;

  }

  /**
   * Used by the MdTable. Called when it connects to the data source.
   * @docs-private
   */
  connect() {
    return this._renderData;
  }

  /**
   * Used by the MdTable. Called when it is destroyed. No-op.
   * @docs-private
   */
  disconnect() { }

}
