import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarElement, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
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
  plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
  weekends: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  selectable: true,
  events: this.myEvents,
  nowIndicator: true,
  eventClick: this.handleEventClick.bind(this),
  dateClick: info => {
    console.log(info);
    this.onOpenAddEventDialog(info);
    // alert('Clicked on: ' + info.dateStr);
    // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    // alert('Current view: ' + info.view.type);
    // change the day's background color just for fun
    // info.dayEl.style.backgroundColor = 'red';
  }
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

  private handleEventClick(arg: any) {
    console.log(arg);
  }
  
  private onOpenAddEventDialog(info: any) {
    let calendarApi = this.calendarRef.nativeElement.getApi();
    console.log(calendarApi);
     if (screen.width < 500) {
      this.dialog.open(AddEventDialogComponent, {
      width: '100%',
        height: '60%',
        data: { info, calendarApi }
  });
     } else {
       console.log(info);
      this.dialog.open(AddEventDialogComponent, {
      width: '50%',
        height: '60%',
        data: { info, calendarApi }
  });
    }
  }
}
