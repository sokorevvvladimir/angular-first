import { Component } from '@angular/core';
import { Contact } from '../contact';
import { Observable } from 'rxjs';
import { ContactsStoreService } from '../contacts-store.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
})
export class ListComponent {
    public filterValue = '';
    public contacts$: Observable<Contact[]> = this.contactsStoreService.contacts$;

    constructor(
        private readonly contactsStoreService: ContactsStoreService,
        public dialog: MatDialog,
    ) {}

    public clearFilter(): void {
        this.filterValue = '';
    }

    public onDelete(id: string): void {
        this.contactsStoreService.deleteContact(id);
        this.clearFilter();
    }

    public onEditOpenDialog = (item: Contact): void => {
        if (screen.width < 500) {
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
