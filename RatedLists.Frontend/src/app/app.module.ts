import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ListOfListsComponent } from './components/list-of-lists/list-of-lists.component';
import { ListOfItemsComponent } from './components/list-of-items/list-of-items.component';
import { ItemDialogComponent } from './components/item-dialog/item-dialog.component';
import {ItemsService} from './services/items.service';
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
  MatButtonToggleModule, MatSliderModule, MatRippleModule
} from '@angular/material';
import {AuthDialogComponent} from './components/auth-dialog/auth-dialog.component';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material';
import { DeleteItemDialogComponent } from './components/delete-item-dialog/delete-item-dialog.component';
import { CompareDialogComponent } from './components/compare-dialog/compare-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import { ListOfComparisonsComponent } from './components/list-of-comparisons/list-of-comparisons.component';
import {ComparisonsService} from './services/comparisons.service';
import { DeleteComparisonDialogComponent } from './components/delete-comparison-dialog/delete-comparison-dialog.component';
import { AddListDialogComponent } from './components/add-list-dialog/add-list-dialog.component';
import {ListsService} from './services/lists.service';
import { DeleteListDialogComponent } from './components/delete-list-dialog/delete-list-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: '/listOfLists', pathMatch: 'full' },
  { path: 'listOfItems/:listId', component: ListOfItemsComponent },
  { path: 'ListOfComparisons', component: ListOfComparisonsComponent },
  { path: 'listOfLists', component: ListOfListsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListOfListsComponent,
    ListOfItemsComponent,
    ItemDialogComponent,
    AuthDialogComponent,
    DeleteItemDialogComponent,
    CompareDialogComponent,
    ListOfComparisonsComponent,
    DeleteComparisonDialogComponent,
    AddListDialogComponent,
    DeleteListDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
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
    MatSliderModule,
    AppRoutingModule,
    MatRippleModule
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
    MatSliderModule,
    MatRippleModule
  ],
  entryComponents: [
    AuthDialogComponent,
    ItemDialogComponent,
    DeleteItemDialogComponent,
    CompareDialogComponent,
    DeleteComparisonDialogComponent,
    AddListDialogComponent,
    DeleteListDialogComponent
  ],
  providers: [
    ItemsService,
    ComparisonsService,
    MatExpansionPanelDescription,
    MatDatepicker,
    FormBuilder,
    MatIconRegistry,
    ListsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
