import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { TotalContactsService } from '../total-contacts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public totalContacts$: Observable<number> = this.totalContactsService.totalContacts$;

  @Output()
  public sidenavToggle = new EventEmitter();

  constructor(private readonly totalContactsService: TotalContactsService) { }
  
 public onToggleSidenav = () => {
   this.sidenavToggle.emit();
}

}
