import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input()
  filteredContacts: Contact[] = [];
  
  @Input()
  contactsList: Contact[] = [];

  @Output()
  updatedContactsList = new EventEmitter<Contact[]>();

  constructor() { }

  onDelete(id: string): void {
  
    this.filteredContacts = this.contactsList.filter(item => item.id !== id);
    this.updatedContactsList.emit(this.filteredContacts);
  
}
 

}
