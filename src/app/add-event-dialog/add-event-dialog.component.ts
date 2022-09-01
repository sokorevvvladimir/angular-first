import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css']
})
export class AddEventDialogComponent implements OnInit {
  public addEventForm: FormGroup;
  public errorMessage: string;
 
  constructor(public dialogRef: MatDialogRef<AddEventDialogComponent>, @Inject(MAT_DIALOG_DATA) public dateObj: any, private readonly fb: FormBuilder, private readonly storeService: StoreService) { }

  ngOnInit(): void {
    this.initForm();
    if (this.addEventForm.invalid) {
      this.getErrorMessage();
    }
  }
  private initForm(): void {
    this.addEventForm = this.fb.group({
      title: ['', [Validators.required]],
      start: [new Date(this.dateObj.info.date), [Validators.required]],
      end: ['']
    })
  }
  private getErrorMessage(): void {
    if (this.addEventForm.controls['title'].hasError('required') ||
      this.addEventForm.controls['start'].hasError('required')) {
      this.errorMessage = 'You must enter a value';
    }
    this.errorMessage = '';
  }

  public addEvent() {
    this.storeService.setMyEvent(this.addEventForm.value, this.dateObj.calendarApi)
  }

}
