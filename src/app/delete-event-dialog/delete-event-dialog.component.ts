import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreService } from '../store.service';

@Component({
    selector: 'app-delete-event-dialog',
    templateUrl: './delete-event-dialog.component.html',
    styleUrls: ['./delete-event-dialog.component.css'],
})
export class DeleteEventDialogComponent implements OnInit {
    public deleteEventForm: FormGroup;
    public errorMessage: string;

    constructor(
        public dialogRef: MatDialogRef<DeleteEventDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dateObj: any,
        private readonly fb: FormBuilder,
        private readonly storeService: StoreService,
    ) {}

    ngOnInit(): void {
        this.initForm();
        if (this.deleteEventForm.invalid) {
            this.getErrorMessage();
        }
    }

    private initForm(): void {
        const tzoffset = new Date().getTimezoneOffset() * 60000;
        const localISOStart = new Date(this.dateObj.arg.event.start - tzoffset)
            .toISOString()
            .substring(0, 16);
        const localISOEnd = new Date(this.dateObj.arg.event.end - tzoffset)
            .toISOString()
            .substring(0, 16);
        this.deleteEventForm = this.fb.group({
            title: [this.dateObj.arg.event._def.title, [Validators.required]],
            start: [localISOStart, [Validators.required]],
            end: [localISOEnd],
        });
    }

    private getErrorMessage(): void {
        if (
            this.deleteEventForm.controls['title'].hasError('required') ||
            this.deleteEventForm.controls['start'].hasError('required')
        ) {
            this.errorMessage = 'You must enter a value';
            return;
        }
        this.errorMessage = '';
    }
    public updateEvent(): void {
        this.storeService.modalUpdate(
            this.deleteEventForm.value,
            this.dateObj,
            this.dateObj.calendarApi,
        );
    }
    public deleteEvent(): void {
        this.storeService.deleteEvent(this.dateObj.arg.event);
    }
}
