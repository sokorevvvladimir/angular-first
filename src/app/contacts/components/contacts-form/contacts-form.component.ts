import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ContactsStoreService } from '../../../services/contacts-store.service';
import { ErrorGenerateService } from '../../../services/error-generate.service';

@Component({
    selector: 'app-contacts-form',
    templateUrl: './contacts-form.component.html',
    styleUrls: ['./contacts-form.component.css'],
})
export class ContactsFormComponent implements OnInit, OnDestroy {
    private myContactsSubscription: Subscription;
    public contactsForm: FormGroup;
    public nameErrorMessage$: Observable<string> =
        this.errorGenerateService.nameErrorMessage$;
    public emailErrorMessage$: Observable<string> =
        this.errorGenerateService.emailErrorMessage$;
    public phoneErrorMessage$: Observable<string> =
        this.errorGenerateService.phoneErrorMessage$;

    constructor(
        private readonly fb: FormBuilder,
        private readonly contactsStoreService: ContactsStoreService,
        public readonly errorGenerateService: ErrorGenerateService,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        if (this.myContactsSubscription) {
            this.myContactsSubscription.unsubscribe();
        }
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

    public addContact(): void {
        if (this.contactsStoreService.setContact(this.contactsForm.value)) {
            this.myContactsSubscription = this.contactsStoreService
                .setContact(this.contactsForm.value)!
                .subscribe();
            this.contactsForm.reset();
        }
    }
}
