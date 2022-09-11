import { Component, OnInit } from '@angular/core';
import { ContactsStoreService } from './services/contacts-store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    public title = 'angular-phonebook-02';

    constructor(private readonly contactsStoreService: ContactsStoreService) {}
    ngOnInit() {
        this.contactsStoreService.getContacts();
    }
}
