import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ListOfListsComponent } from './components/list-of-lists/list-of-lists.component';
import { ListOfItemsComponent } from './components/list-of-items/list-of-items.component';
import { ItemDialogComponent } from './components/item-dialog/item-dialog.component';
import {MainService} from './services/main.service';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatIconRegistry,
  MatDatepicker,
  MatExpansionPanelDescription,
  MatTableModule,
  MatCardModule,
  MatNativeDateModule,
  MatListModule,
  MatSidenavModule,
  MatSelectModule,
  MatOptionModule, MatTreeModule, MatRadioModule, MatSortModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatButtonToggleModule, MatSliderModule
} from '@angular/material';
import {AuthDialogComponent} from './components/auth-dialog/auth-dialog.component';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material';
import { DeleteElementDialogComponent } from './components/delete-element-dialog/delete-element-dialog.component';
import { CompareDialogComponent } from './components/compare-dialog/compare-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListOfListsComponent,
    ListOfItemsComponent,
    ItemDialogComponent,
    AuthDialogComponent,
    DeleteElementDialogComponent,
    CompareDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatTreeModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSliderModule
  ],
  exports: [
    MatExpansionModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatTreeModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatSliderModule
  ],
  entryComponents: [
    AuthDialogComponent,
    ItemDialogComponent,
    DeleteElementDialogComponent,
    CompareDialogComponent
  ],
  providers: [
    MainService,
    MatExpansionPanelDescription,
    MatDatepicker,
    FormBuilder,
    MatIconRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
