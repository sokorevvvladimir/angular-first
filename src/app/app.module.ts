import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { ContactsFormComponent } from './contacts-form/contacts-form.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PlayerComponent } from './player/player.component';
import { LocationComponent } from './location/location.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { FilterPipe } from './pipes/filter.pipe';
import { NotifierComponent } from './notifier/notifier.component';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'location', component: LocationComponent },
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ContactsFormComponent,
    ListComponent,
    HomeComponent,
    ContactsComponent,
    PlayerComponent,
    LocationComponent,
    NotfoundComponent,
    HeaderComponent,
    SidenavListComponent,
    ConfirmDialogComponent,
    EditDialogComponent,
    FilterPipe,
    NotifierComponent,
    AddEventDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
     { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
