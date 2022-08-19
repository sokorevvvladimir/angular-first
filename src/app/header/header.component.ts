import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TotalContactsService } from '../total-contacts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs: Subscription;
  public totalContacts: number;

  @Output()
  public sidenavToggle = new EventEmitter();

  constructor(private readonly totalContactsService: TotalContactsService) { }
 public onToggleSidenav = () => {
   this.sidenavToggle.emit();
}
  ngOnInit(): void {
    this.totalContactsService.totalContacts$.subscribe(totalContacts => this.totalContacts = totalContacts);
  }

  ngOnDestroy(): void {
this.subs.unsubscribe();
  }

}
