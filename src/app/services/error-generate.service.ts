import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ErrorGenerateService {
    private errorMessages = {
        nameErrorMessages: {
            namePatternErrorMessage:
                'A name must contain only letters, numbers and spaces',
            nameMinLengthErrorMessage:
                'Required length is at least 3 characters',
        },
        emailErrorMessages: {
            emailPatternErrorMessage: "An email must contain '@' sign",
        },
        phoneErrorMessages: {
            phonePatternErrorMessage:
                'A phone number must consist of only numbers',
        },
        sharedErrorMessages: {
            sharedRequiredErrorMessage: 'You must enter a value',
        },
    };

    public nameErrorMessage$ = new BehaviorSubject<string>('');
    public emailErrorMessage$ = new BehaviorSubject<string>('');
    public phoneErrorMessage$ = new BehaviorSubject<string>('');
    public titleErrorMessage$ = new BehaviorSubject<string>('');

    private setNamePreciseErrorMessage(value: string): void {
        this.nameErrorMessage$.next(value);
    }

    private setEmailPreciseErrorMessage(value: string): void {
        this.emailErrorMessage$.next(value);
    }

    private setPhonePreciseErrorMessage(value: string): void {
        this.phoneErrorMessage$.next(value);
    }

    private eraseErrorMessage(name: string): void {
        switch (name) {
            case 'name':
                this.setNamePreciseErrorMessage('');
                break;
            case 'email':
                this.setEmailPreciseErrorMessage('');
                break;
            case 'phone':
                this.setPhonePreciseErrorMessage('');
                break;
            default:
                return;
        }
    }

    private setNameErrorMessage(condition: string): void {
        switch (condition) {
            case 'required':
                this.setNamePreciseErrorMessage(
                    this.errorMessages.sharedErrorMessages
                        .sharedRequiredErrorMessage,
                );
                break;
            case 'pattern':
                this.setNamePreciseErrorMessage(
                    this.errorMessages.nameErrorMessages
                        .namePatternErrorMessage,
                );
                break;
            case 'minlength':
                this.setNamePreciseErrorMessage(
                    this.errorMessages.nameErrorMessages
                        .nameMinLengthErrorMessage,
                );
                break;
            default:
                this.setNamePreciseErrorMessage('');
                return;
        }
    }

    private setEmailErrorMessage(condition: string): void {
        switch (condition) {
            case 'required':
                this.setEmailPreciseErrorMessage(
                    this.errorMessages.sharedErrorMessages
                        .sharedRequiredErrorMessage,
                );
                break;
            case 'email':
                this.setEmailPreciseErrorMessage(
                    this.errorMessages.emailErrorMessages
                        .emailPatternErrorMessage,
                );
                break;
            default:
                return;
        }
    }

    private setPhoneErrorMessage(condition: string): void {
        switch (condition) {
            case 'required':
                this.setPhonePreciseErrorMessage(
                    this.errorMessages.sharedErrorMessages
                        .sharedRequiredErrorMessage,
                );
                break;
            case 'pattern':
                this.setPhonePreciseErrorMessage(
                    this.errorMessages.phoneErrorMessages
                        .phonePatternErrorMessage,
                );
                break;
            default:
                return;
        }
    }

    private setTitleErrorMessage(): void {
        this.titleErrorMessage$.next(
            this.errorMessages.sharedErrorMessages.sharedRequiredErrorMessage,
        );
    }

    public setOnBlurErrorMessage(name: string, inputObj: any): void {
        if (inputObj.value !== '') {
            return;
        }
        switch (name) {
            case 'name':
                this.setNamePreciseErrorMessage(
                    this.errorMessages.sharedErrorMessages
                        .sharedRequiredErrorMessage,
                );
                break;
            case 'email':
                this.setEmailPreciseErrorMessage(
                    this.errorMessages.sharedErrorMessages
                        .sharedRequiredErrorMessage,
                );
                break;
            case 'phone':
                this.setPhonePreciseErrorMessage(
                    this.errorMessages.sharedErrorMessages
                        .sharedRequiredErrorMessage,
                );
                break;
            case 'title':
                this.setTitleErrorMessage();
                break;

            default:
                return;
        }
    }

    public setErrorMessage(name: string, condition: any): void {
        if (!condition) {
            this.eraseErrorMessage(name);
            return;
        }
        const error = Object.keys(condition)[0];

        switch (name) {
            case 'name':
                this.setNameErrorMessage(error);
                break;
            case 'email':
                this.setEmailErrorMessage(error);
                break;
            case 'phone':
                this.setPhoneErrorMessage(error);
                break;
            case 'title':
                this.setTitleErrorMessage();
                break;

            default:
                return;
        }
    }
}
