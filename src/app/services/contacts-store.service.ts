import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact';
import { LocalStorageService } from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { NotifierComponent } from '../shared/components/notifier/notifier.component';

@Injectable({
    providedIn: 'root',
})
export class ContactsStoreService {
    private contacts: Contact[] = [];
    public contacts$ = new BehaviorSubject<Contact[]>([]);
    public totalContacts$ = new BehaviorSubject<number>(0);
    
    constructor(
        private readonly snackBar: MatSnackBar,
        private readonly localStorageService: LocalStorageService
    ) {}

    private openSnackBar(
        message: string,
        messageType: 'error' | 'success',
    ): void {
        this.snackBar.openFromComponent(NotifierComponent, {
            data: { message, type: messageType },
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: messageType,
        });
    }

    public set(value: number): void {
        this.totalContacts$.next(value);
    }

    public onSameName(name: string): Contact | undefined {
        return this.contacts.find(
            contact => contact.name.toLowerCase() === name.toLowerCase(),
        );
    }

    public setContact(contact: Contact): void {
        if (this.onSameName(contact.name)) {
            this.openSnackBar(
                `"${contact.name}" is already in contacts.`,
                'error',
            );
            return;
        }
        const item = {
            id: uuidv4(),
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
        };
        this.contacts.push(item);
        this.contacts$.next(this.contacts);
        this.set(this.contacts.length);
        this.localStorageService.set('appContacts', this.contacts);
        this.openSnackBar('Contact added!', 'success');
    }

    public updateContact(contact: Contact): void {
        const idx = this.contacts.findIndex(item => item.id === contact.id);
        this.contacts.splice(idx, 1, contact);
        this.contacts$.next(this.contacts);
        this.localStorageService.set('appContacts', this.contacts);
        this.openSnackBar('Contact updated!', 'success');
    }

    public getContacts(): void {
        this.contacts = this.localStorageService.get('appContacts') || [];
        this.contacts$.next(this.contacts);
        this.set(this.contacts.length);
    }

    public deleteContact(id: string): void {
        this.contacts = this.contacts.filter(item => item.id !== id);
        this.contacts$.next(this.contacts);
        this.localStorageService.set('appContacts', this.contacts);
        this.set(this.contacts.length);
        this.openSnackBar('Contact deleted!', 'success');
    }
}
