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
        return this.editContactForm.controls['name'].hasError('required') ? 'You must enter a value' :
        this.editContactForm.controls['name'].hasError('pattern') ? 'A name must contain only letters, numbers and spaces' :
        this.editContactForm.controls['name'].hasError('minlength') ? 'Required length is at least 3 characters' :
           '';
      case "email":
        return this.editContactForm.controls['email'].hasError('required') ? 'You must enter a value' :
          this.editContactForm.controls['email'].hasError('email') ? "An email must contain '@' sign" :
            '';

      case "phone":
        return this.editContactForm.controls['phone'].hasError('required') ? 'You must enter a value' :
          this.editContactForm.controls['phone'].hasError('pattern') ? 'A phone number must consist of only numbers' :
            '';
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
