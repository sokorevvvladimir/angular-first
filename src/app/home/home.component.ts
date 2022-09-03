import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarElement, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { DeleteEventDialogComponent } from '../delete-event-dialog/delete-event-dialog.component';
import { StoreService } from '../store.service';

defineFullCalendarElement();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('calendar') calendarRef: ElementRef<FullCalendarElement>;
  
private myEvents = this.storeService.getMyEvents();

public calendarOptions: CalendarOptions = {
  plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin],
  weekends: false,
  headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  businessHours: true,
  dayMaxEvents: true,
  selectable: true,
  events: this.myEvents,
  nowIndicator: true,
  forceEventDuration: true,

  eventClick: this.handleEventClick.bind(this),
  dateClick: this.handleDateClick.bind(this),
  eventAllow: this.eventAllowFunc.bind(this),
  eventDrop: this.handleEventDrop.bind(this),
  eventResize: this.handleEventResize.bind(this)
};
 
  constructor(public dialog: MatDialog, private readonly storeService: StoreService) { }

  ngOnInit(): void {
  }

  public toggleWeekends(): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      weekends: !this.calendarOptions.weekends,
    }
  }

  private handleDateClick(info: any): void {
    if (info.date.getTime() < new Date().setHours(0, 0, 0, 0)) {
      return;
    }
    this.onOpenAddEventDialog(info);
  }

  private handleEventClick(arg: any) {
    this.onOpenDeleteEventDialog(arg);
  }

  private eventAllowFunc(dropInfo: any, draggedEvent: any): boolean {
  if (dropInfo.start.getTime() < new Date().setHours(0, 0, 0, 0)) {
      return false;
    }
    return true;
  }
  
  private handleEventDrop(eventDropInfo: any): void {
    const localISOStart = (new Date(eventDropInfo.event._instance?.range.start)).toISOString().substring(0, 16);
    const localISOEnd = (new Date(eventDropInfo.event._instance?.range.end)).toISOString().substring(0, 16);
    this.storeService.updateEvent(eventDropInfo, localISOStart.toString(), localISOEnd.toString())
  }

  private handleEventResize(eventResizeInfo: any): void {
    const localISOStart = (new Date(eventResizeInfo.event._instance?.range.start)).toISOString().substring(0, 16);
    const localISOEnd = (new Date(eventResizeInfo.event._instance?.range.end)).toISOString().substring(0, 16);
    this.storeService.updateEvent(eventResizeInfo, localISOStart.toString(), localISOEnd.toString());
  }

  private onOpenAddEventDialog(info: any): void {
    let calendarApi = this.calendarRef.nativeElement.getApi();
     if (screen.width < 500) {
      this.dialog.open(AddEventDialogComponent, {
      width: '100%',
        height: '60%',
        data: { info, calendarApi }
  });
     } else {
      this.dialog.open(AddEventDialogComponent, {
      width: '50%',
        height: '60%',
        data: { info, calendarApi }
  });
    }
  }

  private onOpenDeleteEventDialog(arg: any): void {
    if (screen.width < 500) {
      this.dialog.open(DeleteEventDialogComponent, {
        width: '100%',
        height: '60%',
        data: arg
      })
} else {
      this.dialog.open(DeleteEventDialogComponent, {
        width: '50%',
        height: '60%',
        data: arg
      })
}
  }
}
