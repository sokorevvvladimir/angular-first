import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contact } from '../contact';
import { StoreService } from '../store.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  public editContactForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public currentContact: Contact, private readonly storeService: StoreService, private readonly fb: FormBuilder) {  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
  this.editContactForm = this.fb.group({
   name: [this.currentContact.name, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    email: [this.currentContact.email, [Validators.required, Validators.email]],
   phone: [this.currentContact.phone, [Validators.required, Validators.pattern('[0-9]*')]]
  });
    
  };

   public getErrorMessage = (name: string) => {
    switch (name) {
      case "name":
        if (this.editContactForm.controls['name'].hasError('required')) {
          return 'You must enter a value'
        } else if (this.editContactForm.controls['name'].hasError('pattern')) {
          return 'A name must contain only letters, numbers and spaces'
        } else if (this.editContactForm.controls['name'].hasError('minlength')) {
          return 'Required length is at least 3 characters'
        } else {
          return ''
        }

      case "email":
        if (this.editContactForm.controls['email'].hasError('required')) {
          return 'You must enter a value'
        } else if (this.editContactForm.controls['email'].hasError('email')) {
          return "An email must contain '@' sign"   
        } else {
          return ''
        }


      case "phone":
        if (this.editContactForm.controls['phone'].hasError('required')) {
          return 'You must enter a value' 
        } else if (this.editContactForm.controls['phone'].hasError('pattern')) {
          return 'A phone number must consist of only numbers'
        } else {
          return ''
        }

      default:
        return;
    }
   }
  
  public updateContact() {
    const { name, email, phone } = this.editContactForm.value;
    const id = this.currentContact.id;
    this.storeService.updateContact({ id, name, email, phone });
  };
}
