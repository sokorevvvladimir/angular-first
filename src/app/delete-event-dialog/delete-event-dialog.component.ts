import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarStoreService } from '../calendar-store.service';
import { ErrorGenerateService } from '../error-generate.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-delete-event-dialog',
    templateUrl: './delete-event-dialog.component.html',
    styleUrls: ['./delete-event-dialog.component.css'],
})
export class DeleteEventDialogComponent implements OnInit {
    public deleteEventForm: FormGroup;
    public titleErrorMessage$: Observable<string> = this.errorGenerateService.titleErrorMessage$;
    public minDate: Date;
    
    constructor(
        public dialogRef: MatDialogRef<DeleteEventDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dateObj: any,
        private readonly fb: FormBuilder,
        private readonly calendarStoreService: CalendarStoreService,
        public readonly errorGenerateService: ErrorGenerateService
    ) { 
        this.minDate = new Date(this.dateObj.arg.event.start);
    }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        const tzoffset = new Date().getTimezoneOffset() * 60000;
        const startTime = new Date(this.dateObj.arg.event.start - tzoffset)
            .toISOString()
            .substring(11, 16);
        const endTime = new Date(this.dateObj.arg.event.end - tzoffset)
            .toISOString()
            .substring(11, 16);
        this.deleteEventForm = this.fb.group({
            title: [this.dateObj.arg.event._def.title, [Validators.required]],
            startDate: [this.dateObj.arg.event.start],
            startTime: [startTime],
            endDate: [this.dateObj.arg.event.end],
            endTime: [endTime],
        });
    }

    public updateEvent(): void {
        this.calendarStoreService.modalUpdate(
            this.deleteEventForm.value,
            this.dateObj,
            this.dateObj.calendarApi,
        );
    }
    public deleteEvent(): void {
        this.calendarStoreService.deleteEvent(this.dateObj.arg.event);
    }
}
