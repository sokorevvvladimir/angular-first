import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContactsStoreService } from '../contacts-store.service';
import { ErrorGenerateService } from '../error-generate.service';

@Component({
    selector: 'app-contacts-form',
    templateUrl: './contacts-form.component.html',
    styleUrls: ['./contacts-form.component.css'],
})
export class ContactsFormComponent implements OnInit {
    public contactsForm: FormGroup;
    public nameErrorMessage$: Observable<string> = this.errorGenerateService.nameErrorMessage$;
    public emailErrorMessage$: Observable<string> = this.errorGenerateService.emailErrorMessage$;
    public phoneErrorMessage$: Observable<string> = this.errorGenerateService.phoneErrorMessage$;

    constructor(
        private readonly fb: FormBuilder,
        private readonly contactsStoreService: ContactsStoreService,
        public readonly errorGenerateService: ErrorGenerateService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.contactsForm = this.fb.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.pattern('[a-zA-Z ]*'),
                ],
            ],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        });
    }

    public addContact() {
        this.contactsStoreService.setContact(this.contactsForm.value);
        this.contactsForm.reset();
    }
}
