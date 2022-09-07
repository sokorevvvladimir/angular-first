import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { TotalContactsService } from '../total-contacts.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
    private subs: Subscription;
    public totalContacts: number;

    @Output()
    public sidenavClose = new EventEmitter();
    constructor(private readonly totalContactsService: TotalContactsService) {}
    public onSidenavClose = () => {
        this.sidenavClose.emit();
    };
    ngOnInit(): void {
        this.totalContactsService.totalContacts$.subscribe(
            totalContacts => (this.totalContacts = totalContacts),
        );
    }
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
