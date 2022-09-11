import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LocationComponent } from './components/location/location.component';
import { LocationRoutingModule } from './location-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ConfirmDialogComponent, LocationComponent],
    imports: [CommonModule, LocationRoutingModule, SharedModule],
    entryComponents: [ConfirmDialogComponent],
})
export class LocationModule {}
