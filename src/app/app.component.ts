import { Component } from '@angular/core';
import { Contact } from './contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-phonebook-02';

  appContacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  
  onPassContacts(contacts: Contact[]): void {
    this.appContacts = contacts;
  }

  onFilterPass(value: string) {
    this.filteredContacts = this.appContacts.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    console.log(this.filteredContacts);
  }
}
