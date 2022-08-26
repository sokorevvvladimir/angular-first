import { Component } from '@angular/core';
import { Contact } from '../contact';
import { Observable } from 'rxjs';
import { StoreService } from '../store.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  public filterValue = '';
  public contacts$: Observable<Contact[]> = this.storeService.contacts$;

  constructor(private readonly storeService: StoreService, public dialog: MatDialog) { }

  public clearFilter(): void {
    this.filterValue = '';
}

   public onDelete(id: string): void {
    this.storeService.deleteContact(id);
    this.clearFilter();
  };

  public onEditOpenDialog = (item: Contact): void => {
   this.dialog.open(EditDialogComponent, {width: '50%', height: '45%', data: item});
  }

}
