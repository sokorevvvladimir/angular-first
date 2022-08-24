import { Component, OnInit, ViewChild} from '@angular/core';
import { Contact } from '../contact';
import { NgToastService } from 'ng-angular-popup'
import { LocalStorageService } from '../local-storage.service';
import { TotalContactsService } from '../total-contacts.service';
import { CurrentContactService } from '../current-contact.service';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  
})
export class ContactsComponent implements OnInit {
  
  public showEdit = false;
  public id: string;

  constructor(private readonly localStorageService: LocalStorageService, private readonly totalContactsService: TotalContactsService, private readonly currentContactService: CurrentContactService, private toast: NgToastService, private vps: ViewportScroller, public dialog: MatDialog) {}
  
  private toastOnAddSuccess(): void {
    this.toast.success({detail: 'Success!', summary: 'Contact added!', duration: 2000, position: 'br'})
  }

  private toastOnDeleteSuccess(): void  {
this.toast.success({detail: 'Success!', summary: 'Contact deleted!', duration: 2000, position: 'br'})
  }

  private toastOnUpdateSuccess(): void  {
this.toast.success({detail: 'Success!', summary: 'Contact updated!', duration: 2000, position: 'br'})
  }

  
  ngOnInit() {
    
    const initialValue = this.localStorageService.get('appContacts');
    this.appContacts = initialValue === null ? [] : initialValue;
    this.filteredContacts = initialValue === null ? [] : initialValue;
    this.totalContactsService.set(this.appContacts.length);
  
  }
  public appContacts: Contact[] = [];
  public filteredContacts: Contact[] = [];
  
  public onItemClick = (item: Contact): void => {
    
    this.currentContactService.set(item);
  }

 public onPassContacts(contacts: Contact[]): void {
    this.appContacts = contacts;
   this.filteredContacts = contacts;
   
   this.localStorageService.set('appContacts', contacts);
   this.totalContactsService.set(this.appContacts.length);
   this.toastOnAddSuccess();
  }

  public onFilterPass(value: string): void {
    this.filteredContacts = this.appContacts.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
  }

  public onDelete(id: string): void {
    this.filteredContacts = this.appContacts.filter(item => item.id !== id);
    this.appContacts = this.filteredContacts;
    this.localStorageService.set('appContacts', this.appContacts);
    this.totalContactsService.set(this.appContacts.length);
    this.toastOnDeleteSuccess();
  }
  ;

  private scrollFn(anchor: string): void{
  	this.vps.scrollToAnchor(anchor)
  }
  public onEditOpenDialog = (): void => {
    const dialogRef = this.dialog.open(EditDialogComponent, {});
    dialogRef.afterClosed().subscribe(res => { console.log(res) })
  }
  // public onEdit(id: string): void {
  //   this.id = id;
  //   this.showEdit = true;
  
  //   this.scrollFn("update-btn");
  // }

  public onUpdateContact(contact: Contact): void {
    const idx = this.appContacts.findIndex((item) => item.id === contact.id)
    const updatedContacts = this.appContacts;
    updatedContacts.splice(idx, 1, contact);
    this.filteredContacts = updatedContacts;
    this.id = '';
    this.toastOnUpdateSuccess();
  }

  public onUpdatedShowEdit(showEdit: any): void {
  
    this.showEdit = showEdit;
    
  }
}
