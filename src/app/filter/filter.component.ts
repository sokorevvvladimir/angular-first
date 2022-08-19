import { Component, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output()
  public filter = new EventEmitter<string>();

  public filterValue = '';
  constructor() { }

  public onInputChange(value: string): void {
    this.filter.emit(value);
  }

  public clearFilter(): void {
    this.filterValue = '';
  }

}
