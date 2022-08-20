import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Contact } from '../contact';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {
public editContactForm: FormGroup;
  constructor(private readonly fb: FormBuilder) { }
  @Input()
  public currentContact: Contact;

  @Input()
  public showEdit: boolean;

  @Output()
  public updateShowEdit = new EventEmitter<boolean>();

  @Output()
  public updatedContact = new EventEmitter<Contact>();

  ngOnInit(): void {
  this.initForm();
  };

  

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

    this.updatedContact.emit({ id, name, email, phone });
    this.showEdit = false;
    this.updateShowEdit.emit(this.showEdit);

  };

  public isControlInvalid(controlName: string): boolean {
const control = this.editContactForm.controls[controlName];

 const result = control.invalid && control.touched;

 return result;
}
}
