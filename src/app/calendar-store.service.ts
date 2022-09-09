import { Injectable } from '@angular/core';
import { MyEvent } from './event';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from './notifier/notifier.component';

@Injectable({
    providedIn: 'root',
})
export class CalendarStoreService {
    public myEvents$ = new BehaviorSubject<MyEvent[]>([]);

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

    public getMyEvents(): void {
        const myEvents = this.localStorageService.get('myEvents') || [];
        this.myEvents$.next(myEvents);
    }

    public setMyEvent(myEvent: {
        title: string;
        startDate: Date;
        startTime: string;
        endDate: Date;
        endTime: string;
    }): void {
        const { start, end } = this.dateCompiler(myEvent);

        const eventToAdd: MyEvent = {
            id: uuidv4(),
            title: myEvent.title,
            start,
            end,
        };
        const updatedEvents = [...this.myEvents$.getValue(), eventToAdd];
        this.myEvents$.next(updatedEvents);
        this.localStorageService.set('myEvents', updatedEvents);
        this.openSnackBar('Event added!', 'success');
    }

    public setMyExternalEvent(externalEvent: any): void {
        const externalEventToAdd: MyEvent = {
            backgroundColor: externalEvent.backgroundColor,
            borderColor: externalEvent.borderColor,
            constraint: externalEvent.constraint,
            allDay: externalEvent.allDay,
            start: externalEvent.start,
            end: externalEvent.end,
            title: externalEvent.title,
            id: externalEvent.id,
        };
        const updatedEvents = [
            ...(this.localStorageService.get('myEvents') || []),
            externalEventToAdd,
        ];
        this.localStorageService.set('myEvents', updatedEvents);
        this.openSnackBar('Event added!', 'success');
    }

    public updateEvent(
        eventInfo: any,
        updatedStart: string,
        updatedEnd: string,
    ): void {
        const allEvents = this.localStorageService.get('myEvents');
        const idx = allEvents.findIndex(
            (item: MyEvent) => item.id === eventInfo.event._def.publicId,
        );
        const eventToUpdate: MyEvent = {
            id: eventInfo.event._def.publicId,
            title: eventInfo.event._def.title,
            start: updatedStart,
            end: updatedEnd,
            backgroundColor: eventInfo.event.backgroundColor,
            borderColor: eventInfo.event.borderColor,
            constraint: eventInfo.event.constraint,
        };

        allEvents.splice(idx, 1, eventToUpdate);
        this.localStorageService.set('myEvents', allEvents);
        this.openSnackBar('Event updated!', 'success');
    }

    public modalUpdate(
        myEvent: {
            title: string;
            startDate: Date;
            startTime: string;
            endDate: Date;
            endTime: string;
        },
        idObj: any,
        calendarApi: any,
    ): void {
        const { start, end } = this.dateCompiler(myEvent);

        const id = idObj.arg.event._def.publicId;
        const eventToUpdate = calendarApi.getEventById(id);
        eventToUpdate.setStart(start);
        eventToUpdate.setEnd(end);
        eventToUpdate.setProp('title', myEvent.title);
        eventToUpdate.setProp(
            'backgroundColor',
            idObj.arg.event.backgroundColor,
        );
        eventToUpdate.setProp('borderColor', idObj.arg.event.borderColor);
        eventToUpdate.setProp('constraint', idObj.arg.event.constraint);

        const allEvents = this.localStorageService.get('myEvents');
        const idx = allEvents.findIndex((item: MyEvent) => item.id === id);
        const eventToUpdateWithModal: MyEvent = {
            id,
            title: myEvent.title,
            start,
            end,
            backgroundColor: idObj.arg.event.backgroundColor,
            borderColor: idObj.arg.event.borderColor,
            constraint: idObj.arg.event.constraint,
        };

        allEvents.splice(idx, 1, eventToUpdateWithModal);
        this.localStorageService.set('myEvents', allEvents);
        this.openSnackBar('Event updated!', 'success');
    }

    public deleteEvent(event: any): void {
        event.remove();
        const allEvents = this.localStorageService.get('myEvents');
        const idx = allEvents.findIndex(
            (item: MyEvent) => item.id === event._def.publicId,
        );
        allEvents.splice(idx, 1);
        this.localStorageService.set('myEvents', allEvents);
        this.openSnackBar('Event deleted!', 'success');
    }

    private dateCompiler(myEvent: {
        title: string;
        startDate: Date;
        startTime: string;
        endDate: Date;
        endTime: string;
    }): Record<string, string> {
         const tzoffset = new Date().getTimezoneOffset() * 60000;
        const startDate = new Date(myEvent.startDate.getTime() - tzoffset)
            .toISOString()
            .substring(0, 11);
        const endDate = new Date(myEvent.endDate.getTime() - tzoffset)
            .toISOString()
            .substring(0, 11);
        const start = startDate + myEvent.startTime;
        const end = endDate + myEvent.endTime;
        return {start, end}
    }
}
