import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalContactsService {
  public totalContacts$ = new BehaviorSubject<number>(0);
  
  constructor() { }

  public set(value: number): void {
    this.totalContacts$.next(value);
  }
}
