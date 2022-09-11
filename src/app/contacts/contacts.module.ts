import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsFormComponent } from './components/contacts-form/contacts-form.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ListComponent } from './components/list/list.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ContactsFormComponent,
        ContactsComponent,
        ListComponent,
        EditDialogComponent,
        FilterPipe,
    ],
    imports: [CommonModule, ContactsRoutingModule, SharedModule],
})
export class ContactsModule {}
