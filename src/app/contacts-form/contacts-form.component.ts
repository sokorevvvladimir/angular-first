import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { Contact } from '../contact';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent implements OnInit {
  
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
  addContact(name: string, number: string) {
    if (name === '' || number === "") {
      return;
    };
    this.contacts.push({id: uuidv4(), name, number} as Contact)
    this.contact.name = '';
    this.contact.number = '';
    this.newContacts.emit(this.contacts);
    
 }
  ngOnInit(): void {
  }

}
