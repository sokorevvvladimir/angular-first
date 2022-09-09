import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarStoreService } from '../calendar-store.service';
import { ErrorGenerateService } from '../error-generate.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-event-dialog',
    templateUrl: './add-event-dialog.component.html',
    styleUrls: ['./add-event-dialog.component.css'],
})
export class AddEventDialogComponent implements OnInit {
    public addEventForm: FormGroup;
    public titleErrorMessage$: Observable<string> = this.errorGenerateService.titleErrorMessage$;
    public minDate: Date;
    
    constructor(
        public dialogRef: MatDialogRef<AddEventDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public info: any,
        private readonly fb: FormBuilder,
        private readonly calendarStoreService: CalendarStoreService,
        public readonly errorGenerateService: ErrorGenerateService
    ) { 
        this.minDate = new Date(this.info.date)
    }

    ngOnInit(): void {
        this.initForm();
    }
    private initForm(): void {
        const tzoffset = new Date().getTimezoneOffset() * 60000;
        const duration = 3600000;
        const startTime = new Date(this.info.date - tzoffset)
            .toISOString()
            .substring(11, 16);
        const endTime = new Date(this.info.date - tzoffset + duration)
            .toISOString()
            .substring(11, 16);
      
        this.addEventForm = this.fb.group({
            title: ['', [Validators.required]],
            startDate: [this.info.date],
            startTime: [startTime],
            endDate: [this.info.date],
            endTime: [endTime]
        });
    }

    public addEvent(): void {
        this.calendarStoreService.setMyEvent(
            this.addEventForm.value
        );
    }
}
