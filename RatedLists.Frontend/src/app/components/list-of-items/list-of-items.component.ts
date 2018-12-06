import {Component, OnInit, ViewChild} from '@angular/core';
import {Item, ITEMS} from '../../models/item';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material//paginator';
import {ItemDialogComponent} from '../item-dialog/item-dialog.component';
import {DialogAnyData} from '../../models/dialogAnyData';
import {DeleteElementDialogComponent} from '../delete-element-dialog/delete-element-dialog.component';

@Component({
  selector: 'app-list-of-items',
  templateUrl: './list-of-items.component.html',
  styleUrls: ['./list-of-items.component.css']
})
export class ListOfItemsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'picture', 'grade', 'delete'];
  dataSource =  new MatTableDataSource<ItemViewModel>(ITEMS.map(x => {
    const ivm = new ItemViewModel(this.dialog);
    ivm.item = x;
    return ivm;
  }));

  constructor(public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    ItemDialogComponent.onAddItem.subscribe(x => {
      const ivm = new ItemViewModel(this.dialog);
      ivm.item = new Item();
      ivm.item.name = x;
      this.dataSource.data.push(ivm);
      console.log(this.dataSource.data);
    });
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.item.name.toLowerCase().includes(filter) || data.item.grade.toString().toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openAddDialog(isBulkAdd) {
    const data = new DialogAnyData();
    data.isBulkAdd = isBulkAdd;
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '300px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

class ItemViewModel {
  item: Item;
  isChangeName = false;
  isChangeGrade = false;
  isChangePicture = false;

  constructor(public dialog: MatDialog) { }

  deleteItem() {
    const data = new DialogAnyData();
    data.name = this.item.name;
    const dialogRef = this.dialog.open(DeleteElementDialogComponent, {
      width: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
