import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Contact } from '../../../models/contact';
import { ContactsStoreService } from '../../../services/contacts-store.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnDestroy {
    private myContactsSubscription: Subscription;
    public filterValue = '';
    public contacts$: Observable<Contact[]> =
        this.contactsStoreService.contacts$;

    constructor(
        private readonly contactsStoreService: ContactsStoreService,
        public dialog: MatDialog,
    ) {}

    ngOnDestroy(): void {
        if (this.myContactsSubscription) {
            this.myContactsSubscription.unsubscribe();
        }
    }

    public clearFilter(): void {
        this.filterValue = '';
    }

    public onDelete(id: string): void {
        if (this.contactsStoreService.deleteContact(id)) {
            this.myContactsSubscription = this.contactsStoreService
                .deleteContact(id)
                .subscribe();
            this.clearFilter();
        }
    }

    public onEditOpenDialog = (item: Contact): void => {
        if (screen.width < 600) {
            this.dialog.open(EditDialogComponent, {
                width: '100%',
                height: '60%',
                data: item,
            });
        } else {
            this.dialog.open(EditDialogComponent, {
                width: '50%',
                height: '60%',
                data: item,
            });
        }
    };
}
