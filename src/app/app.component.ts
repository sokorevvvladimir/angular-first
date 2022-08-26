import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'angular-phonebook-02';
 
  constructor (private readonly storeService: StoreService) {}
  ngOnInit() {
    this.storeService.getContacts();
  }
}
