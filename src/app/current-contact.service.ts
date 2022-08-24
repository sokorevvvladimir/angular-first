import { Injectable } from '@angular/core';
import { Contact } from './contact';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentContactService {
  public currentContact$ = new Subject<Contact>();
  constructor() { }
  public set(value: Contact): void {
    this.currentContact$.next(value);
  }
}
