import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalContactsService {
  public totalContacts$ = new Subject<number>();
  
  constructor() { }

  public set(value: number): void {
    this.totalContacts$.next(value);
  }
}
