import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent implements OnInit {
  
 public contactsForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly storeService: StoreService) { }
  
ngOnInit(): void {
  this.initForm();
  };

  private initForm(): void {
  this.contactsForm = this.fb.group({
   name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    email: ['', [Validators.required, Validators.email]],
   phone: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  });
  };

  public getErrorMessage = (name: string) => {
    switch (name) {
      case "name":
        return this.contactsForm.controls['name'].hasError('required') ? 'You must enter a value' :
        this.contactsForm.controls['name'].hasError('pattern') ? 'A name must contain only letters, numbers and spaces' :
        this.contactsForm.controls['name'].hasError('minlength') ? 'Required length is at least 3 characters' :
           '';
      case "email":
        return this.contactsForm.controls['email'].hasError('required') ? 'You must enter a value' :
          this.contactsForm.controls['email'].hasError('email') ? "An email must contain '@' sign" :
            '';

      case "phone":
        return this.contactsForm.controls['phone'].hasError('required') ? 'You must enter a value' :
          this.contactsForm.controls['phone'].hasError('pattern') ? 'A phone number must consist of only numbers' :
            '';
      default:
        return;
    }
  }
  
  public addContact() {
    this.storeService.setContact(this.contactsForm.value)
    this.contactsForm.reset();
  }

}
