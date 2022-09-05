import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { MyEvent } from './event';
import { BehaviorSubject, map, filter} from 'rxjs';
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

  public myEvents$ = new BehaviorSubject<MyEvent[]>([])

  constructor(private readonly snackBar: MatSnackBar,
    private readonly localStorageService: LocalStorageService,
    private readonly totalContactsService: TotalContactsService) { }

  public openSnackBar (message: string, 
    messageType: 'error' | 'success'): void {
    this.snackBar.openFromComponent(NotifierComponent,
      {
        data: { message, type: messageType },
        duration: 3000,
        horizontalPosition: 'end', panelClass: messageType
      });
  }

  public onSameName (name: string): Contact | undefined {
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

  public updateContact(contact: Contact): void {
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

  public getMyEvents(): MyEvent[] {
    const myEvents = this.localStorageService.get('myEvents') || [];
    this.myEvents$.next(myEvents);
    return myEvents;
  }

  public setMyEvent(myEvent: { title: string, start: string, end?: string }, calendarApi: any): void {
    const eventToAdd = { id: uuidv4(), title: myEvent.title, start: myEvent.start, end: myEvent.end }
    this.myEvents$.pipe(map(myEvents => {
      myEvents.push(eventToAdd);
      calendarApi.addEvent(eventToAdd);
     this.localStorageService.set('myEvents', myEvents);
    this.openSnackBar('Event added!', 'success');
    })).subscribe()
  }

  public setMyExternalEvent(externalEvent: any): void {
   
    const externalEventToAdd = { backgroundColor: externalEvent.backgroundColor, borderColor: externalEvent.borderColor, constraint: externalEvent.constraint, allDay: externalEvent.allDay, start: externalEvent.start, end: externalEvent.end, title: externalEvent.title, id: externalEvent.id }
    this.myEvents$.pipe(map(myEvents => {
      myEvents.push(externalEventToAdd);
      this.localStorageService.set('myEvents', myEvents);
      this.openSnackBar('Event added!', 'success');
   })).subscribe()
  }

  public updateEvent(eventInfo: any, updatedStart: string, updatedEnd: string): void {
    this.myEvents$.pipe(map(items => items.findIndex(item => item.id === eventInfo.event._def.publicId)))
      .subscribe(idx => {
        const eventToUpdate = {
          id: eventInfo.event._def.publicId,
          title: eventInfo.event._def.title,
          start: updatedStart,
          end: updatedEnd,
          backgroundColor: eventInfo.event.backgroundColor,
          borderColor: eventInfo.event.borderColor,
          constraint: eventInfo.event.constraint
        }
        this.myEvents$.pipe(map(myEvents => {
          myEvents.splice(idx, 1, eventToUpdate);
          this.localStorageService.set('myEvents', myEvents);
          this.openSnackBar('Event updated!', 'success');
        })).subscribe(); 
      });
  }

  public modalUpdate(myEvent: {title: string, start: string, end: string}, idObj: any, calendarApi: any): void {
    const id = idObj.arg.event._def.publicId;
    const eventToUpdate = calendarApi.getEventById(id);
    eventToUpdate.setStart(myEvent.start);
    eventToUpdate.setEnd(myEvent.end);
    eventToUpdate.setProp("title", myEvent.title);
    eventToUpdate.setProp("backgroundColor", idObj.arg.event.backgroundColor);
    eventToUpdate.setProp("borderColor", idObj.arg.event.borderColor);
    eventToUpdate.setProp("constraint", idObj.arg.event.constraint);

    this.myEvents$.pipe(map(items => items.findIndex(item => item.id === id)))
      .subscribe(idx => {
        const eventToUpdate = {
          id,
          title: myEvent.title,
          start: myEvent.start,
          end: myEvent.end,
          backgroundColor: idObj.arg.event.backgroundColor,
          borderColor: idObj.arg.event.borderColor,
          constraint: idObj.arg.event.constraint
        }
        this.myEvents$.pipe(map(myEvents => {
          myEvents.splice(idx, 1, eventToUpdate);
          this.localStorageService.set('myEvents', myEvents);
          this.openSnackBar('Event updated!', 'success');
        })).subscribe(); 
      });
  }

  public deleteEvent(event: any): void {
    event.remove();
    this.myEvents$.pipe(map(items => items.findIndex(item => item.id === event._def.publicId)))
      .subscribe(idx => this.myEvents$.pipe(map(myEvents => {
        myEvents.splice(idx, 1);
        this.localStorageService.set('myEvents', myEvents);
        this.openSnackBar('Event deleted!', 'success');
      })).subscribe()
    )
  };
}
