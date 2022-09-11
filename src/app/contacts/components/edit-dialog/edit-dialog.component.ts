import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Contact } from '../../../models/contact';
import { ErrorGenerateService } from '../../../services/error-generate.service';
import { ContactsStoreService } from '../../../services/contacts-store.service';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-dialog.component.html',
    styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
    public editContactForm: FormGroup;
    public nameErrorMessage$: Observable<string> =
        this.errorGenerateService.nameErrorMessage$;
    public emailErrorMessage$: Observable<string> =
        this.errorGenerateService.emailErrorMessage$;
    public phoneErrorMessage$: Observable<string> =
        this.errorGenerateService.phoneErrorMessage$;

    constructor(
        public dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public currentContact: Contact,
        private readonly contactsStoreService: ContactsStoreService,
        private readonly fb: FormBuilder,
        public readonly errorGenerateService: ErrorGenerateService,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.editContactForm = this.fb.group({
            name: [
                this.currentContact.name,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.pattern('[a-zA-Z ]*'),
                ],
            ],
            email: [
                this.currentContact.email,
                [Validators.required, Validators.email],
            ],
            phone: [
                this.currentContact.phone,
                [Validators.required, Validators.pattern('[0-9]*')],
            ],
        });
    }

    public updateContact() {
        const { name, email, phone } = this.editContactForm.value;
        const id = this.currentContact.id;
        this.contactsStoreService.updateContact({ id, name, email, phone });
    }
}
