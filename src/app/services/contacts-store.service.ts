import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, Observable, tap, filter, from } from 'rxjs';
import { Contact } from '../models/contact';
import { LocalStorageService } from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { NotifierComponent } from '../shared/components/notifier/notifier.component';

@Injectable({
    providedIn: 'root',
})
export class ContactsStoreService {
    public contacts$ = new BehaviorSubject<Contact[]>([]);
    public totalContacts$ = new BehaviorSubject<number>(0);

    constructor(
        private readonly snackBar: MatSnackBar,
        private readonly localStorageService: LocalStorageService,
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
        const existingContacts =
            this.localStorageService.get('appContacts') || [];

        const isInDatabase = existingContacts.find(
            (contact: Contact) =>
                contact.name.toLowerCase() === name.toLowerCase(),
        );

        return isInDatabase;
    }

    public setContact(contact: Contact): Observable<Contact[]> | undefined {
        if (this.onSameName(contact.name)) {
            this.openSnackBar(
                `"${contact.name}" is already in contacts.`,
                'error',
            );
            return;
        }

        const item: Contact = {
            id: uuidv4(),
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
        };

        return this.contacts$.pipe(
            map((myContacts: Contact[]) => {
                myContacts.push(item);
                return myContacts;
            }),
            tap((myContacts: Contact[]) => {
                this.set(myContacts.length);
                this.localStorageService.set('appContacts', myContacts);
                this.openSnackBar('Contact added!', 'success');
            }),
        );
    }

    public updateContact(contact: Contact): Observable<Contact[]> {
        return this.contacts$.pipe(
            map((myContacts: Contact[]) => {
                const idx = myContacts.findIndex(
                    item => item.id === contact.id,
                );
                myContacts.splice(idx, 1, contact);
                return myContacts;
            }),
            tap((myContacts: Contact[]) => {
                this.localStorageService.set('appContacts', myContacts);
                this.openSnackBar('Contact updated!', 'success');
            }),
        );
    }

    public getContacts(): void {
        const existingContacts =
            this.localStorageService.get('appContacts') || [];
        this.contacts$.next(existingContacts);
        this.set(existingContacts.length);
    }

    public deleteContact(id: string): Observable<Contact[]> {
        return this.contacts$.pipe(
            map((myContacts: Contact[]) => {
                const idx = myContacts.findIndex(item => item.id === id);
                myContacts.splice(idx, 1);
                return myContacts;
            }),
            tap((myContacts: Contact[]) => {
                console.log(myContacts);
                console.log(this.contacts$);
                this.localStorageService.set('appContacts', myContacts);
                this.set(myContacts.length);
                this.openSnackBar('Contact deleted!', 'success');
            }),
        );
    }
}
