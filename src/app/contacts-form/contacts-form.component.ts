import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NgToastService } from 'ng-angular-popup'

import { Contact } from '../contact';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.css']
})
export class ContactsFormComponent implements OnInit {
  
 public contactsForm: FormGroup;

  @Output()
  public newContacts = new EventEmitter<Contact[]>();
  
  @Input()
  public contacts: Contact[] = [];


  constructor(private readonly fb: FormBuilder, private toast: NgToastService) { }
  
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
  
  public onSameName(name: string) { 
    return this.contacts.find(contact => contact.name === name)
  }
  
  public addContact(formDirective: FormGroupDirective) {
    const { name, email, phone } = this.contactsForm.value;
  
    if (this.onSameName(name)) {
      // alert(`${name} is already in contacts.`);
      this.toastError(name);
      return;
    };
    this.contacts.push({id: uuidv4(), name, email, phone} as Contact)

    this.newContacts.emit(this.contacts);
    this.contactsForm.reset();
    formDirective.resetForm();
  };

   private toastError(name: string): void {
    this.toast.error({detail: 'Error!', summary: `"${name}" is already in contacts.`, duration: 2000, position: 'br'})
  }

public isControlInvalid(controlName: string): boolean {
const control = this.contactsForm.controls[controlName];

 const result = control.invalid && control.touched;

 return result;
}


}
