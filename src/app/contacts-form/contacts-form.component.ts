import { Component, Output, EventEmitter, Input } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { Contact } from '../contact';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent  {
  
  @Output()
  newContacts = new EventEmitter<Contact[]>();
  
  @Input()
  contacts: Contact[] = [];

  contact: Contact = {
    id: '',
    name: '',
    number: ''
  };
  constructor() { }

  onSameName(name: string) { 
    return this.contacts.find(contact => contact.name === name)
  }
  
  addContact(name: string, number: string) {
    if (name === '' || number === "") {
      return;
    } else if (this.onSameName(name)) {
      alert(`${name} is already in contacts.`);
      return;
    };
    this.contacts.push({id: uuidv4(), name, number} as Contact)
    this.contact.name = '';
    this.contact.number = '';
    this.newContacts.emit(this.contacts);
    
 }


}
