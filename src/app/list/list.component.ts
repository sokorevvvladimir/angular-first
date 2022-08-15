import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnChanges {

  @Input()
  contactsList: Contact[] = [];

  @Output()
  updatedContactsList = new EventEmitter<Contact[]>();

  constructor() { }

  onDelete(id: string): void {
  
    this.contactsList= this.contactsList.filter(item => item.id !== id);
    this.updatedContactsList.emit(this.contactsList);
  
}
  ngOnChanges(): void {

  }

  

}
