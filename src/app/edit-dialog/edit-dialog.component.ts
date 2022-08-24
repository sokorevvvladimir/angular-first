import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Contact } from '../contact';
import { CurrentContactService } from '../current-contact.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  public editContactForm: FormGroup;
  public currentContact: Contact;
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public message: string, private readonly currentContactService: CurrentContactService, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.currentContactService.currentContact$.subscribe(currentContact => { this.currentContact = currentContact; this.initForm();})
  
  }

  private initForm(): void {
  this.editContactForm = this.fb.group({
   name: [this.currentContact.name, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    email: [this.currentContact.email, [Validators.required, Validators.email]],
   phone: [this.currentContact.phone, [Validators.required, Validators.pattern('[0-9]*')]]
  });
    
  };

  public updateContact(formDirective: FormGroupDirective) {
    const { name, email, phone } = this.editContactForm.value;
    const id = this.currentContact.id;

    this.currentContactService.set({ id, name, email, phone });
    // this.showEdit = false;
    // this.updateShowEdit.emit(this.showEdit);

  };

  public isControlInvalid(controlName: string): boolean {
const control = this.editContactForm.controls[controlName];

 const result = control.invalid && control.touched;

 return result;
}

}
