import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactsStoreService } from '../contacts-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public totalContacts$: Observable<number> = this.contactsStoreService.totalContacts$;

  @Output()
  public sidenavToggle = new EventEmitter();

  constructor(private readonly contactsStoreService: ContactsStoreService) { }
  
 public onToggleSidenav = () => {
   this.sidenavToggle.emit();
}

}
