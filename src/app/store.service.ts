import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { TotalContactsService } from './total-contacts.service';
import { v4 as uuidv4 } from 'uuid';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NotifierComponent } from './notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public contacts$ = new BehaviorSubject<Contact[]>([]);
  private contacts: Contact[] = [];

  public myEvents$ = new BehaviorSubject<any[]>([])

  constructor(private readonly snackBar: MatSnackBar,
    private readonly localStorageService: LocalStorageService,
    private readonly totalContactsService: TotalContactsService) { }

  private openSnackBar (message: string, 
    messageType: 'error' | 'success'): void {
    this.snackBar.openFromComponent(NotifierComponent,
      {
        data: { message, type: messageType },
        duration: 2000,
        horizontalPosition: 'end', panelClass: messageType
      });
  }

  public onSameName (name: string) {
    return this.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
  }
 
  public setContact(contact: Contact): void {
    if (this.onSameName(contact.name)) {
     this.openSnackBar(`"${contact.name}" is already in contacts.`, 'error');
      return;
    }
    const item = { id: uuidv4(), name: contact.name, email: contact.email, phone: contact.phone };
    this.contacts.push(item);
    this.contacts$.next(this.contacts);
    this.totalContactsService.set(this.contacts.length);
    this.localStorageService.set("appContacts", this.contacts);
  this.openSnackBar('Contact added!',  'success');
  }

  public updateContact(contact: Contact) {
    const idx = this.contacts.findIndex(item => item.id === contact.id);
    this.contacts.splice(idx, 1, contact);
    this.contacts$.next(this.contacts);
    this.openSnackBar('Contact updated!', 'success');
  }

  public getContacts(): void {
    this.contacts = this.localStorageService.get('appContacts') || [];
    this.contacts$.next(this.contacts);
    this.totalContactsService.set(this.contacts.length);
  }

  public deleteContact(id: string): void {
    this.contacts = this.contacts.filter(item => item.id !== id);
    this.contacts$.next(this.contacts);
    this.localStorageService.set("appContacts", this.contacts);
    this.totalContactsService.set(this.contacts.length);
  this.openSnackBar('Contact deleted!',  'success');
  }

  public getMyEvents(): any[] {
    const myEvents = this.localStorageService.get('myEvents') || [];
    this.myEvents$.next(myEvents);
    return myEvents;
  }

  public setMyEvent(myEvent: {title: string, start: Date, end?: Date}, calendarApi: any): void {
  const eventToAdd = {id: uuidv4(), title: myEvent.title, start: myEvent.start, end: myEvent.end, editable: true}
    this.myEvents$.subscribe(myEvents => {
      myEvents.push(eventToAdd);
      calendarApi.addEvent(eventToAdd);
     this.localStorageService.set('myEvents', myEvents);
    this.openSnackBar('Event added!', 'success');
    }); 
  }
}
