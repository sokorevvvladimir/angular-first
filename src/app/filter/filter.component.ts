import { Component, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output()
  filter = new EventEmitter<string>();

  filterValue = '';
  constructor() { }

  onInputChange(value: string): void {
    this.filter.emit(value);
  }

  clearFilter(): void {
    this.filterValue = '';
  }

}
